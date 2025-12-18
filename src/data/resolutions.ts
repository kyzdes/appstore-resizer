/**
 * App Store Screenshot Resolutions
 *
 * Official Apple App Store Connect screenshot requirements
 * Updated for 2024/2025 specifications
 */

import { Resolution } from '@/types';

export const RESOLUTIONS: Resolution[] = [
  // iPhone - 6.9" Display (iPhone 16 Pro Max, 15 Pro Max, 15 Plus, 14 Plus)
  {
    width: 1320,
    height: 2868,
    diagonal: '6.9"',
    device: 'iPhone',
    orientation: 'portrait',
  },
  {
    width: 2868,
    height: 1320,
    diagonal: '6.9"',
    device: 'iPhone',
    orientation: 'landscape',
  },

  // iPhone - 6.7" Display (iPhone 14 Pro Max, 13 Pro Max, 12 Pro Max)
  {
    width: 1290,
    height: 2796,
    diagonal: '6.7"',
    device: 'iPhone',
    orientation: 'portrait',
  },
  {
    width: 2796,
    height: 1290,
    diagonal: '6.7"',
    device: 'iPhone',
    orientation: 'landscape',
  },

  // iPhone - 6.5" Display (iPhone 11 Pro Max, Xs Max, XR, 11)
  {
    width: 1242,
    height: 2688,
    diagonal: '6.5"',
    device: 'iPhone',
    orientation: 'portrait',
  },
  {
    width: 2688,
    height: 1242,
    diagonal: '6.5"',
    device: 'iPhone',
    orientation: 'landscape',
  },

  // iPhone - 6.1" Display (iPhone 16 Pro, 15 Pro, 14 Pro, 13 Pro, 13, 12 Pro, 12)
  {
    width: 1179,
    height: 2556,
    diagonal: '6.1"',
    device: 'iPhone',
    orientation: 'portrait',
  },
  {
    width: 2556,
    height: 1179,
    diagonal: '6.1"',
    device: 'iPhone',
    orientation: 'landscape',
  },

  // iPhone - 5.5" Display (iPhone 8 Plus, 7 Plus, 6s Plus)
  {
    width: 1242,
    height: 2208,
    diagonal: '5.5"',
    device: 'iPhone',
    orientation: 'portrait',
  },
  {
    width: 2208,
    height: 1242,
    diagonal: '5.5"',
    device: 'iPhone',
    orientation: 'landscape',
  },

  // iPad Pro - 12.9" Display (6th gen, 5th gen, 4th gen, 3rd gen)
  {
    width: 2048,
    height: 2732,
    diagonal: '12.9"',
    device: 'iPad',
    orientation: 'portrait',
  },
  {
    width: 2732,
    height: 2048,
    diagonal: '12.9"',
    device: 'iPad',
    orientation: 'landscape',
  },

  // iPad Pro - 11" Display (4th gen, 3rd gen, 2nd gen, 1st gen)
  {
    width: 1668,
    height: 2388,
    diagonal: '11"',
    device: 'iPad',
    orientation: 'portrait',
  },
  {
    width: 2388,
    height: 1668,
    diagonal: '11"',
    device: 'iPad',
    orientation: 'landscape',
  },

  // iPad Air - 10.9" Display (5th gen, 4th gen)
  {
    width: 1640,
    height: 2360,
    diagonal: '10.9"',
    device: 'iPad',
    orientation: 'portrait',
  },
  {
    width: 2360,
    height: 1640,
    diagonal: '10.9"',
    device: 'iPad',
    orientation: 'landscape',
  },

  // iPad - 10.2" Display (9th gen, 8th gen, 7th gen)
  {
    width: 1620,
    height: 2160,
    diagonal: '10.2"',
    device: 'iPad',
    orientation: 'portrait',
  },
  {
    width: 2160,
    height: 1620,
    diagonal: '10.2"',
    device: 'iPad',
    orientation: 'landscape',
  },

  // Apple Watch - Series 10 (46mm)
  {
    width: 416,
    height: 496,
    diagonal: '46mm',
    device: 'Apple Watch',
    orientation: 'portrait',
  },

  // Apple Watch - Series 9/8/7 (45mm)
  {
    width: 396,
    height: 484,
    diagonal: '45mm',
    device: 'Apple Watch',
    orientation: 'portrait',
  },

  // Apple Watch - Series 6/SE (44mm)
  {
    width: 368,
    height: 448,
    diagonal: '44mm',
    device: 'Apple Watch',
    orientation: 'portrait',
  },

  // Apple Watch - Series 10 (42mm)
  {
    width: 396,
    height: 484,
    diagonal: '42mm',
    device: 'Apple Watch',
    orientation: 'portrait',
  },

  // Apple Watch - Series 9/8/7 (41mm)
  {
    width: 352,
    height: 430,
    diagonal: '41mm',
    device: 'Apple Watch',
    orientation: 'portrait',
  },

  // Apple Watch - Series 6/SE (40mm)
  {
    width: 324,
    height: 394,
    diagonal: '40mm',
    device: 'Apple Watch',
    orientation: 'portrait',
  },
];

/**
 * Get resolutions grouped by device type
 */
export const getResolutionsByDevice = (): Record<string, Resolution[]> => {
  return RESOLUTIONS.reduce((acc, resolution) => {
    const device = resolution.device;
    if (!acc[device]) {
      acc[device] = [];
    }
    acc[device].push(resolution);
    return acc;
  }, {} as Record<string, Resolution[]>);
};

/**
 * Get all unique device types
 */
export const getDeviceTypes = (): string[] => {
  return Array.from(new Set(RESOLUTIONS.map((r) => r.device)));
};

/**
 * Get resolutions for a specific device and orientation
 */
export const getResolutionsForDevice = (
  device: string,
  orientation?: 'portrait' | 'landscape'
): Resolution[] => {
  return RESOLUTIONS.filter(
    (r) =>
      r.device === device &&
      (orientation === undefined || r.orientation === orientation)
  );
};

/**
 * Format resolution for display
 */
export const formatResolution = (resolution: Resolution): string => {
  return `${resolution.width} × ${resolution.height}`;
};

/**
 * Get resolution aspect ratio
 */
export const getAspectRatio = (resolution: Resolution): number => {
  return resolution.width / resolution.height;
};
