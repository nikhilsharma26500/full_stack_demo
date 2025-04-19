const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// User CRUD operations
async function createUser(userData) {
  return await prisma.user.create({
    data: userData,
  });
}

async function getAllUsers() {
  return await prisma.user.findMany({
    include: {
      profile: true,
      post: true
    }
  });
}

async function getUserById(id) {
  return await prisma.user.findUnique({
    where: { id: Number(id) },
    include: {
      profile: true,
      post: true
    }
  });
}

async function updateUser(id, userData) {
  return await prisma.user.update({
    where: { id: Number(id) },
    data: userData,
  });
}

async function deleteUser(id) {
  return await prisma.user.delete({
    where: { id: Number(id) },
  });
}

// Profile CRUD operations
async function createProfile(profileData) {
  return await prisma.profile.create({
    data: profileData,
  });
}

async function getProfileByUserId(userId) {
  return await prisma.profile.findUnique({
    where: { userId: Number(userId) },
  });
}

async function updateProfile(userId, profileData) {
  return await prisma.profile.update({
    where: { userId: Number(userId) },
    data: profileData,
  });
}

async function deleteProfile(id) {
  return await prisma.profile.delete({
    where: { id: Number(id) },
  });
}

// Post CRUD operations
async function createPost(postData) {
  return await prisma.post.create({
    data: postData,
  });
}

async function getAllPosts() {
  return await prisma.post.findMany({
    include: {
      author: true,
    }
  });
}

async function getPostById(id) {
  return await prisma.post.findUnique({
    where: { id: Number(id) },
    include: {
      author: true,
    }
  });
}

async function getPostsByAuthorId(authorId) {
  return await prisma.post.findMany({
    where: { authorId: Number(authorId) },
  });
}

async function updatePost(id, postData) {
  return await prisma.post.update({
    where: { id: Number(id) },
    data: postData,
  });
}

async function deletePost(id) {
  return await prisma.post.delete({
    where: { id: Number(id) },
  });
}

// Keep the main function for backward compatibility
async function main(dataset) {
  return await createUser({
    email: dataset.email,
    username: dataset.username,
  });
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  createProfile,
  getProfileByUserId,
  updateProfile,
  deleteProfile,
  createPost,
  getAllPosts,
  getPostById,
  getPostsByAuthorId,
  updatePost,
  deletePost
};