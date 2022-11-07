import wol from 'wake_on_lan';

const mac = process.env.MAC;
if (!mac) throw new Error('MAC environment variable is required');

const wake = (mac) => {
  return new Promise((resolve, reject) => {
    wol.wake(mac, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

try {
  await wake(mac);
} catch (err) {
  console.error(err);
  process.exit(1);
}
process.exit(0);
