import { PrismaClient } from '@prisma/client';

const prisma: any = new PrismaClient();

const userData = [
  {
    name: 'administrator',
    email: 'admin@teqqed.com',
    password: '1234'
  },
  {
    name: 'tester',
    email: 'tester@teqqed.com',
    password: '1234'
  }
];

function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function generateRandomName() {
  const firstNames = [
    'James',
    'Oliver',
    'Emma',
    'Sophia',
    'Ava',
    'Noah',
    'Liam',
    'Mia',
    'Lucas',
    'Amelia'
  ];
  const lastNames = [
    'Smith',
    'Johnson',
    'Brown',
    'Taylor',
    'Anderson',
    'Thomas',
    'Jackson',
    'White',
    'Harris',
    'Martin'
  ];

  const randomFirstName = firstNames[getRandomInt(firstNames.length)];
  const randomLastName = lastNames[getRandomInt(lastNames.length)];

  return `${randomFirstName} ${randomLastName}`;
}

const statusItems = ['Active', 'Cancelled', 'Pending', 'Completed'];
const methodItems = ['BTC', 'SOLANA'];

function getRandomItem(array: string | any[]) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

async function main() {
  console.log(`Start seeding ...`);
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u
    });
    console.log(`Created user with id: ${user.id}`);
  }

  for (var i = 0; i < 100; i++) {
    const transaction = {
      amount: getRandomArbitrary(3000, 15000),
      name: generateRandomName(),
      status: getRandomItem(statusItems),
      method: getRandomItem(methodItems)
    };
    const user = await prisma.Transaction.create({
      data: transaction
    });
    console.log(`Created transaction with id: ${user.id}`);
  }

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
