1实战-优化缓存
1. 直接一个普通变量，对比时间差，如果相差在预期内，直接取用缓存变量；
2. 对于不会再变化的， 设置一个map，get从中取值，没有的话就set设置值; 
3. 同2，如果数据结构更复杂，设置复杂map, string对应对象，size限制长度，如果超出了clear清除下

1
let regionTimeCache: { 
  timestamp: number; 
  region: string; 
  value: dayjs.Dayjs 
} | null = null;

const CACHE_DURATION = 6000; // 1s缓存

/**
 * 获取地区本地化时间
 * @param nowTimestamp 时间戳
 * @returns 本地化时间
 */
export function getRegionTime(nowTimestamp?: number) {
  const now = nowTimestamp || Date.now();
  const curRegion = getCurRegion()?.code || defaultRegionPacks.curRegion.code;
  
  // 检查缓存是否有效
  if (regionTimeCache && 
      regionTimeCache.region === curRegion && 
      (now - regionTimeCache.timestamp) < CACHE_DURATION) {
    return regionTimeCache.value;
  }
  
  // 重新计算并缓存
  const curRegionTime = dayjs(getFormatTimeByCityId(cityId)).locale("en");
  
  regionTimeCache = {
    timestamp: now,
    region: curRegion,
    value: curRegionTime
  };
  
  return curRegionTime;
}



2
const isMonRegionCache = new Map<string, boolean>();

export const isMonRegion = (region: string) => {
  const key = region || "default";
  const cached = isMonRegionCache.get(key);
  if (cached !== undefined) return cached;

  const workDay = MCalendar.getWeekInfoByRegion(region)?.firstDayOfWeek || WeekDAY.SUN;
  const res = workDay === WeekDAY.MON;
  isMonRegionCache.set(key, res);
  return res;
};


3
const calRegionWeekCache = new Map<string, { 
  region: string; 
  type: string; 
  result: dayjs.Dayjs 
}>();

export function calRegionWeek(_region: string, d: Dayjs, type?: string) {
  const date = dayjs(d);
  const dateKey = date.format('YYYY-MM-DD');
  const cacheKey = `${_region}-${type || 'default'}-${dateKey}`;
  
  // 检查缓存
  if (calRegionWeekCache.has(cacheKey)) {
    const cached = calRegionWeekCache.get(cacheKey)!;
    return cached.result;
  }
  
  // 缓存 region 信息，避免重复计算
  let result // todo
  // 缓存结果（限制缓存大小）
  if (calRegionWeekCache.size > 1000) {
    calRegionWeekCache.clear();
  }
  calRegionWeekCache.set(cacheKey, { region: _region, type: type || 'default', result });
  
  return result;
}