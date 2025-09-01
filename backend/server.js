require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const roleRoutes = require('./routes/roles');
const auditRoutes = require('./routes/auditLogs');
const analyticsRoutes = require('./routes/analyticsRoutes');

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",  // React CRA default
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
};



app.use(cors(corsOptions));
app.use(express.json());
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/superadmin/users', userRoutes);
app.use('/api/v1/superadmin/roles', roleRoutes);
app.use('/api/v1/superadmin/audit-logs', auditRoutes);
app.use('/api/v1/superadmin/analytics', analyticsRoutes);


const PORT = process.env.PORT || 4000;
sequelize.sync({ alter: true }).then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
