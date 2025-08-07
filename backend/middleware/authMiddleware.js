import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const protect = async (req, res, next) => {
  let token;
  
  // Check for token in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract token from header
      token = req.headers.authorization.split(' ')[1];
      
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Get user from token payload (without password)
      req.user = await User.findById(decoded.id).select('-password');
      
      // Continue to the next middleware/route handler
      next();
    } catch (error) {
      console.error('Not authorized, token failed');
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }
  
  // If no token found
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export { protect };