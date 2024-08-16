let { PrismaClient } = require('@prisma/client');
let prisma = new PrismaClient();

let userData = [
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

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function generateRandomName() {
  let firstNames = [
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
  let lastNames = [
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

  let randomFirstName = firstNames[getRandomInt(firstNames.length)];
  let randomLastName = lastNames[getRandomInt(lastNames.length)];

  return `${randomFirstName} ${randomLastName}`;
}

let statusItems = ['Active', 'Cancelled', 'Pending', 'Completed'];
let methodItems = ['BTC', 'SOLANA'];

function getRandomItem(array) {
  let randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

async function main() {
  for (let i = 0; i < userData.length; i++) {
    await prisma.user.create({
      data: userData[i]
    });
  }

  for (let i = 0; i < 100; i++) {
    let _transaction = {
      amount: getRandomArbitrary(3000, 15000),
      name: generateRandomName(),
      status: getRandomItem(statusItems),
      method: getRandomItem(methodItems)
    };
    await prisma.Transaction.create({
      data: _transaction
    });
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
