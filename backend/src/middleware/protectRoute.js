import { clerkClient, requireAuth } from "@clerk/express";
import User from "../models/User.js";
import { upsertStreamUser } from "../lib/stream.js";

const syncUserFromClerk = async (clerkId) => {
  const clerkUser = await clerkClient.users.getUser(clerkId);

  const userData = {
    clerkId,
    name:
      [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ") ||
      clerkUser.username ||
      clerkUser.primaryEmailAddress?.emailAddress ||
      "Unknown User",
    email:
      clerkUser.primaryEmailAddress?.emailAddress || clerkUser.emailAddresses[0]?.emailAddress,
    profileImage: clerkUser.imageUrl || "",
  };

  if (!userData.email) {
    throw new Error("Unable to resolve a primary email address for the authenticated Clerk user");
  }

  const user = await User.findOneAndUpdate(
    { clerkId },
    { $set: userData },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  await upsertStreamUser({
    id: user.clerkId.toString(),
    name: user.name,
    image: user.profileImage,
  });

  return user;
};

export const protectRoute = [
  requireAuth(),
  async (req, res, next) => {
    try {
      const clerkId = req.auth().userId;

      if (!clerkId) return res.status(401).json({ message: "Unauthorized - invalid token" });

      // Find the user in our database, and create it from Clerk if it doesn't exist yet.
      let user = await User.findOne({ clerkId });

      if (!user) {
        user = await syncUserFromClerk(clerkId);
      }

      if (!user) return res.status(404).json({ message: "User not found" });

      // attach user to req
      req.user = user;

      next();
    } catch (error) {
      console.error("Error in protectRoute middleware", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
];
