import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient({
    log: ['error'],
});

async function main() {
    console.log('🌱 Starting production seed (safe mode)...');

    // Check if we already have data
    const userCount = await prisma.user.count();
    const companyCount = await (prisma as any).company.count();

    if (userCount > 0 || companyCount > 0) {
        console.log('📊 Existing data found:');
        console.log(`- Users: ${userCount}`);
        console.log(`- Companies: ${companyCount}`);
        console.log('⚠️ Skipping seed to preserve existing data');
        console.log('💡 To force seed, clear the database first');
        return;
    }

    console.log('🆕 No existing data found, proceeding with seed...');

    // Hash password for all users
    const hashedPassword = await bcrypt.hash('password123', 12);

    // Create Company
    console.log('🏢 Creating company...');
    const company = await (prisma as any).company.create({
        data: {
            name: 'STM Journals Inc',
            domain: 'stm.com',
            address: '123 Publishing Way, New York, NY',
            phone: '+1-212-555-0199',
            email: 'contact@stm.com',
            website: 'https://stm.com',
        }
    });

    // Create Super Admin
    console.log('👤 Creating super admin...');
    const superAdmin = await (prisma.user as any).create({
        data: {
            email: 'admin@stm.com',
            password: hashedPassword,
            role: 'SUPER_ADMIN',
            emailVerified: true,
            companyId: company.id,
            customerProfile: {
                create: {
                    customerType: 'INDIVIDUAL',
                    name: 'Admin User',
                    primaryEmail: 'admin@stm.com',
                    primaryPhone: '+1-555-0001',
                    companyId: company.id,
                    country: 'United States',
                } as any,
            },
        },
    });

    // Create a few sample journals
    console.log('📰 Creating sample journals...');
    const journals = [];
    const journalData = [
        {
            name: 'Nature Journal',
            issnPrint: '0028-0836',
            issnOnline: '1476-4687',
            frequency: 'Weekly',
            formats: ['Print', 'Online', 'Hybrid'],
            subjects: ['Science', 'Research', 'Biology'],
            price: 5200,
        },
        {
            name: 'Science Direct Collection',
            issnPrint: '0036-8075',
            issnOnline: '1095-9203',
            frequency: 'Weekly',
            formats: ['Online', 'Hybrid'],
            subjects: ['Science', 'Technology', 'Medicine'],
            price: 8500,
        },
    ];

    for (const j of journalData) {
        const journal = await prisma.journal.create({
            data: {
                name: j.name,
                issnPrint: j.issnPrint,
                issnOnline: j.issnOnline,
                frequency: j.frequency,
                formatAvailable: j.formats.join(','),
                subjectCategory: j.subjects.join(','),
                priceINR: j.price,
                priceUSD: j.price / 84, // Approx conversion
                isActive: true,
            },
        });
        journals.push(journal);

        // Create basic plans
        await prisma.plan.create({
            data: {
                journalId: journal.id,
                planType: 'Annual',
                format: 'Online',
                duration: 12,
                priceINR: j.price,
                priceUSD: j.price / 84,
                startDateRule: 'immediate',
                gracePeriod: 30,
            },
        });
    }

    console.log('✅ Production seed completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`- Users: ${await prisma.user.count()}`);
    console.log(`- Companies: ${await (prisma as any).company.count()}`);
    console.log(`- Journals: ${await prisma.journal.count()}`);
    console.log(`- Plans: ${await prisma.plan.count()}`);

    console.log('\n🔑 Admin Credentials:');
    console.log('- Email: admin@stm.com');
    console.log('- Password: password123');
    console.log('⚠️ Please change the admin password after first login!');
}

main()
    .catch((e) => {
        console.error('❌ Production seed failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });