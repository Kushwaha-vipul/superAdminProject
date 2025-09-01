const bcrypt = require('bcryptjs');
const { User, Role } = require('./models'); 
const sequelize = require('./config');

async function seed() {
    await sequelize.sync({ force: true });

    // 1. Roles create karo dynamically
    const roleNames = ['superadmin', 'user', 'manager'];
    const roles = [];
    for (const name of roleNames) {
        const [role] = await Role.findOrCreate({ where: { name } });
        roles.push(role);
    }

    // 2. Super Admin create karo aur role assign karo
    const hashedPassword = await bcrypt.hash('Test1234!', 10);
    const superAdmin = await User.create({
        name: 'Super Admin',
        email: 'superadmin@example.com',
        hashedPassword,
        roles: [] // initially empty
    });

    // 3. Assign superadmin role from Roles table
    const superadminRole = roles.find(r => r.name === 'superadmin');
    superAdmin.roles = [superadminRole.name];
    await superAdmin.save();

    console.log('Seed complete!');
    process.exit();
}

seed();
