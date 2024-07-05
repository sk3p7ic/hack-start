import { relations, sql } from "drizzle-orm";
import {
  date,
  index,
  integer,
  json,
  pgEnum,
  pgTableCreator,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `hack-start_${name}`);

/**
 * Different levels of sponsorship for sponsors.
 * Feel free to change to match your desired level(s).
 */
export const sponsorshipLevels = pgEnum("sponsorshipLevel", [
  "none", "not_specified", "bronze", "silver", "gold", "platinum"
]);

/**
 * Sponsors and other hosts of the hackathon.
 */
export const organizations = createTable("sponsor", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }),
  desc: varchar("desc", { length: 511 }),
  href: varchar("href", { length: 255 }),
  image: varchar("image", { length: 255 }),
  level: sponsorshipLevels("sponsorshipLevel")
    .default("not_specified")
    .notNull(),
});

/**
 * Different event types.
 * Feel free to change to match the event type(s) you would like.
 */
export const eventTypes = pgEnum("eventType", [
  "general", "meal", "workshop", "ceremony"
]);

/**
 * Events during the hackathon.
 */
export const events = createTable("event", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  desc: varchar("desc", { length: 511 }).notNull(),
  href: varchar("href", { length: 255 }),
  image: varchar("image", { length: 255 }),
  hosts: varchar("hosts", { length: 511 }),
  location: varchar("location", { length: 255 }),
  startDate: date("startDate").notNull(),
  endDate: date("startDate").notNull(),
  eventType: eventTypes("eventType")
    .default("general")
    .notNull(),
});

/**
 * Tracks check-ins to events by participants.
 */
export const checkIns = createTable("checkin", {
  id: serial("id").primaryKey(),
  time: timestamp("time", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`),
  userId: varchar("userId", { length: 255 })
    .notNull()
    .references(() => users.id),
  eventId: integer("eventId")
    .notNull()
    .references(() => events.id)
});

/**
 * Connects sponsors to events via a many-to-many relationship.
 */
export const eventsSponsorsRelations = relations(events, ({ many }) => ({
  sponsors: many(organizations)
}));

export const userRoles = pgEnum("userRole", [
  "none", "registerant", "hacker", "admin", "super_admin"
]);

/**
 * Different 'groups' that a user may be in. Groups may be useful for handling
 * certain events such as meal distribution.
 * Feel free to change these to match the theme of your hackathon.
 */
export const userGroups = pgEnum("userGroup", [
  "none", "red", "green", "blue"
]);

/**
 * Tables defined below are used for NextAuth. You likely won't need to update
 * these, but if you do please be careful and do your research first.
 */

export const users = createTable("user", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
    withTimezone: true,
  }).default(sql`CURRENT_TIMESTAMP`),
  image: varchar("image", { length: 255 }),
  registration: json("registration"),
  registrationTime: timestamp("registrationTime", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  role: userRoles("role")
    .default("none")
    .notNull(),
  group: userGroups("group")
    .default("none")
    .notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
}));

export const accounts = createTable(
  "account",
  {
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_userId_idx").on(account.userId),
  })
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  "session",
  {
    sessionToken: varchar("sessionToken", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_userId_idx").on(session.userId),
  })
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);
