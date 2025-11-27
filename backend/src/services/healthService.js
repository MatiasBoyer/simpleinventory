async function serverHealth(value) {
  const { errorStatus } = value;
  if (errorStatus) {
    const err = new Error('Fake error!');
    err.status = errorStatus;
    throw err;
  }

  return { message: 'OK!' };
}

export { serverHealth };
