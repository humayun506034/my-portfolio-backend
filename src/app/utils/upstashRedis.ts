import config from '../config';

const redisRestUrl = config.upstash_redis_rest_url;
const redisRestToken = config.upstash_redis_rest_token;

const isRedisConfigured = (): boolean => {
  return Boolean(redisRestUrl && redisRestToken);
};

const executeRedisCommand = async (
  command: Array<string | number>,
): Promise<unknown | null> => {
  if (!isRedisConfigured()) {
    return null;
  }

  try {
    const response = await fetch(redisRestUrl as string, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${redisRestToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(command),
    });

    if (!response.ok) {
      return null;
    }

    const body = (await response.json()) as {
      result?: unknown;
      error?: string;
    };

    if (body.error) {
      return null;
    }

    return body.result ?? null;
  } catch {
    return null;
  }
};

const getFromCache = async <T>(key: string): Promise<T | null> => {
  const result = await executeRedisCommand(['GET', key]);
  if (typeof result !== 'string') {
    return null;
  }

  try {
    return JSON.parse(result) as T;
  } catch {
    return null;
  }
};

const setToCache = async (
  key: string,
  value: unknown,
  ttlSeconds?: number,
): Promise<void> => {
  const command: Array<string | number> = ['SET', key, JSON.stringify(value)];
  if (typeof ttlSeconds === 'number' && ttlSeconds > 0) {
    command.push('EX', ttlSeconds);
  }
  await executeRedisCommand(command);
};

const deleteFromCache = async (key: string): Promise<void> => {
  await executeRedisCommand(['DEL', key]);
};

export const upstashRedis = {
  getFromCache,
  setToCache,
  deleteFromCache,
  isRedisConfigured,
};
