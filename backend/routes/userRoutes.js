import express from 'express';
import { 
  registerUser, 
  getUsers, 
  loginUser, 
  getProfile, 
  updateProfile,
  changePassword 
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.get('/', protect, getUsers);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.put('/changepassword', protect, changePassword);

export default router;
