import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

export const connectDB = async () => {
  try {
    if (!process.env.MONGO_URL || !DB_NAME) {
      throw new Error("MongoDB URL or DB_NAME is missing!");
    }

    const connectionInstance = await mongoose.connect(process.env.MONGO_URL, {
      dbName: DB_NAME, // specify DB name here
    });

    console.log(`✅ MongoDB connected: ${connectionInstance.connection.host}/${DB_NAME}`);
  } catch (error) {
    console.error("❌ Error connecting to MongoDB  okay:", error);
    process.exit(1);
  }
};

export default connectDB;

// import mongoose from "mongoose";
// import { DB_NAME } from "../constant.js";wefw


// export const connectDB = async () => {
//   const maxRetries = 3;
//   let retryCount = 0;
  
//   const connectWithRetry = async () => {
//     try {
//       if (!process.env.MONGO_URL || !DB_NAME) {
//         throw new Error("MongoDB URL or DB_NAME is missing!");
//       }

//       console.log(`Attempt ${retryCount + 1}/${maxRetries} to connect to MongoDB...`);
      
//       // Parse the URL to handle SRV/non-SRV differently
//       const mongoUrl = process.env.MONGO_URL.trim();
//       const isSrv = mongoUrl.startsWith('mongodb+srv://');
      
//       // Configure connection options
//       const options = {
//         dbName: DB_NAME,
//         connectTimeoutMS: 15000,
//         socketTimeoutMS: 45000,
//         serverSelectionTimeoutMS: 30000,
//         maxPoolSize: 10,
//         retryWrites: true,
//         retryReads: true
//       };
      
//       // If using SRV, add specific options
//       if (isSrv) {
//         options.srvServiceName = 'mongodb';
//         // Try with IPv4 only to avoid IPv6 issues
//         process.env.NODE_OPTIONS = '--dns-result-order=ipv4first';
//       } else {
//         options.family = 4; // Force IPv4 for non-SRV
//       }
      
//       const connectionInstance = await mongoose.connect(mongoUrl, options);
      
//       console.log(`✅ MongoDB connected successfully!`);
//       console.log(`   Host: ${connectionInstance.connection.host}`);
//       console.log(`   Database: ${DB_NAME}`);
//       console.log(`   Connection state: ${mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`);
      
//       // Connection event handlers
//       mongoose.connection.on('error', (err) => {
//         console.error('MongoDB connection error:', err.message);
//       });
      
//       mongoose.connection.on('disconnected', () => {
//         console.log('MongoDB disconnected. Attempting to reconnect...');
//         setTimeout(connectWithRetry, 5000);
//       });
      
//       return connectionInstance;
      
//     } catch (error) {
//       retryCount++;
      
//       console.error(`❌ Connection attempt ${retryCount} failed:`, error.message);
      
//       if (error.code === 'ETIMEOUT' || error.name === 'MongoNetworkError') {
//         console.error('\n💡 Network/DNS Issue Detected!');
//         console.error('Trying these solutions:');
        
//         if (retryCount === 1) {
//           console.error('1. Switching to IPv4 only...');
//           // Set Node.js to prefer IPv4
//           process.env.NODE_OPTIONS = '--dns-result-order=ipv4first';
//         } else if (retryCount === 2) {
//           console.error('2. Trying alternative connection method...');
//           // Convert SRV to standard connection string
//           if (process.env.MONGO_URL.includes('mongodb+srv://')) {
//             const standardUrl = process.env.MONGO_URL.replace('mongodb+srv://', 'mongodb://');
//             // You might need to get the actual shard URLs from Atlas
//             console.error('   Consider using standard connection string:', standardUrl);
//           }
//         }
        
//         if (retryCount < maxRetries) {
//           console.log(`Retrying in 3 seconds... (${maxRetries - retryCount} attempts remaining)`);
//           await new Promise(resolve => setTimeout(resolve, 3000));
//           return connectWithRetry();
//         }
//       }
      
//       // If we get here, all retries failed
//       console.error('\n🚨 All connection attempts failed!');
//       console.error('Please try:');
//       console.error('1. Check your internet connection');
//       console.error('2. Verify MongoDB Atlas IP whitelist includes 0.0.0.0/0');
//       console.error('3. Try using a VPN');
//       console.error('4. Contact your network administrator about DNS restrictions');
      
//       process.exit(1);
//     }
//   };
  
//   return connectWithRetry();
// };

// export default connectDB;