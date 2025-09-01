const bcrypt = require('bcryptjs');
const { User, Role } = require('./models'); 
const sequelize = require('./config');

async function seed() {
    await sequelize.sync({ force: true });

   
    const roleNames = ['superadmin', 'user', 'manager'];
    const roles = [];
    for (const name of roleNames) {
        const [role] = await Role.findOrCreate({ where: { name } });
        roles.push(role);
    }


    const hashedPassword = await bcrypt.hash('Test1234!', 10);
    const superAdmin = await User.create({
        name: 'Super Admin',
        email: 'superadmin@example.com',
        hashedPassword,
        roles: []
    });

   
    const superadminRole = roles.find(r => r.name === 'superadmin');
    superAdmin.roles = [superadminRole.name];
    await superAdmin.save();

    console.log('Seed complete!');
    process.exit();
}

seed();
