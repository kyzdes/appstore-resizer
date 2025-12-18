/**
 * Resolutions Hook
 *
 * Manages resolution selection and filtering
 */

import * as React from 'react';
import { Resolution, DeviceType } from '@/types';
import { RESOLUTIONS } from '@/data/resolutions';

export const useResolutions = () => {
  const [selectedResolutions, setSelectedResolutions] = React.useState<Resolution[]>([]);
  const [deviceFilter, setDeviceFilter] = React.useState<DeviceType | 'all'>('all');
  const [orientationFilter, setOrientationFilter] = React.useState<
    'all' | 'portrait' | 'landscape'
  >('all');

  // Filtered resolutions based on device and orientation
  const filteredResolutions = React.useMemo(() => {
    return RESOLUTIONS.filter((resolution) => {
      const matchesDevice =
        deviceFilter === 'all' || resolution.device === deviceFilter;
      const matchesOrientation =
        orientationFilter === 'all' || resolution.orientation === orientationFilter;
      return matchesDevice && matchesOrientation;
    });
  }, [deviceFilter, orientationFilter]);

  // Toggle resolution selection
  const toggleResolution = React.useCallback((resolution: Resolution) => {
    setSelectedResolutions((prev) => {
      const exists = prev.find(
        (r) => r.width === resolution.width && r.height === resolution.height
      );

      if (exists) {
        return prev.filter(
          (r) => !(r.width === resolution.width && r.height === resolution.height)
        );
      } else {
        return [...prev, resolution];
      }
    });
  }, []);

  // Check if resolution is selected
  const isResolutionSelected = React.useCallback(
    (resolution: Resolution) => {
      return selectedResolutions.some(
        (r) => r.width === resolution.width && r.height === resolution.height
      );
    },
    [selectedResolutions]
  );

  // Select all filtered resolutions
  const selectAll = React.useCallback(() => {
    setSelectedResolutions((prev) => {
      const newResolutions = [...prev];

      filteredResolutions.forEach((resolution) => {
        const exists = newResolutions.find(
          (r) => r.width === resolution.width && r.height === resolution.height
        );
        if (!exists) {
          newResolutions.push(resolution);
        }
      });

      return newResolutions;
    });
  }, [filteredResolutions]);

  // Deselect all filtered resolutions
  const deselectAll = React.useCallback(() => {
    setSelectedResolutions((prev) => {
      return prev.filter((resolution) => {
        return !filteredResolutions.some(
          (r) => r.width === resolution.width && r.height === resolution.height
        );
      });
    });
  }, [filteredResolutions]);

  // Clear all selections
  const clearSelections = React.useCallback(() => {
    setSelectedResolutions([]);
  }, []);

  return {
    selectedResolutions,
    setSelectedResolutions,
    filteredResolutions,
    deviceFilter,
    orientationFilter,
    setDeviceFilter,
    setOrientationFilter,
    toggleResolution,
    isResolutionSelected,
    selectAll,
    deselectAll,
    clearSelections,
  };
};
