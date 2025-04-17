import prompts from 'prompts';
import bcrypt from 'bcrypt';
import { prisma } from '../src/libs/connectdb.js';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function main() {
  try {
    const response = await prompts([
      {
        type: 'text',
        name: 'email',
        message: 'Enter superuser email:',
        validate: email => 
          EMAIL_REGEX.test(email) ? true : 'Please enter a valid email address'
      },
      {
        type: 'text',
        name: 'username',
        message: 'Enter username:',
        validate: username => {
          if (username.length < 3) return 'Username must be at least 3 characters';
          if (!/^[a-zA-Z0-9_-]+$/.test(username)) return 'Username can only contain letters, numbers, underscores, and hyphens';
          return true;
        }
      },
      {
        type: 'password',
        name: 'password',
        message: 'Enter password:',
        validate: password => {
          if (password.length < 8) return 'Password must be at least 8 characters';
          if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter';
          if (!/[a-z]/.test(password)) return 'Password must contain at least one lowercase letter';
          if (!/[0-9]/.test(password)) return 'Password must contain at least one number';
          return true;
        }
      },
      {
        type: 'password',
        name: 'confirmPassword',
        message: 'Confirm password:',
        validate: (val, { password }) => 
          val === password ? true : 'Passwords do not match'
      }
    ], {
      onCancel: () => {
        console.log('❌ Operation cancelled by user');
        process.exit(0);
      }
    });

    // Check for incomplete responses
    if (!response.email || !response.username || !response.password) {
      console.log('❌ Incomplete information provided');
      return;
    }

    const { email, username, password } = response;

    // Check for existing email
    const existingEmail = await prisma.user.findUnique({ where: { email } });
    if (existingEmail) {
      console.log('❌ A user with this email already exists.');
      return;
    }

    // Check for existing username
    const existingUsername = await prisma.user.findUnique({ where: { userName: username } });
    if (existingUsername) {
      console.log('❌ A user with this username already exists.');
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        userName: username,
        password: hashedPassword,
        role: 'admin',
        emailVerified: new Date()
      }
    });

    console.log('\n✅ Superuser created successfully!\n');
    console.log(`   Email:    ${user.email}`);
    console.log(`   Username: ${user.userName}`);
    console.log(`   Role:     ${user.role}\n`);

  } catch (error) {
    console.error('❌ An error occurred during superuser creation:');
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();