/**
 * Russian Translations
 */

import { Translation } from './en';

export const ru: Translation = {
  app: {
    title: 'App Store Ресайзер',
    subtitle: 'Конвертер скриншотов для Apple App Store',
  },

  header: {
    settings: 'Настройки',
    toggleTheme: 'Сменить тему',
    changeLanguage: 'Изменить язык',
  },

  footer: {
    author: 'Завайбкодил PRODUCTOWNER',
  },

  upload: {
    title: 'Загрузить скриншоты',
    subtitle: 'Начните с загрузки ваших скриншотов',
    dropzone: {
      title: 'Перетащите изображения сюда',
      subtitle: 'или нажмите для выбора файлов',
      formats: 'JPEG или PNG • Макс {maxFiles} файлов • До {maxSize} каждый',
    },
    filesSelected: 'Выбрано файлов: {count}',
    removeFile: 'Удалить файл',
    features: {
      allResolutions: {
        title: 'Все разрешения',
        description: 'iPhone, iPad, Apple Watch',
      },
      fastProcessing: {
        title: 'Быстрая обработка',
        description: 'Оптимизировано для скорости',
      },
      privateSecure: {
        title: 'Приватно и безопасно',
        description: 'Вся обработка происходит локально',
      },
    },
    errors: {
      invalidType: 'Неверный тип файла. Разрешены только изображения JPEG и PNG',
      tooLarge: 'Файл "{filename}" слишком большой. Максимальный размер {maxSize}',
      tooMany: 'Максимум {maxFiles} файлов разрешено',
      dimensionsTooSmall: 'Размеры изображения слишком малы. Минимальный размер {width}×{height}px',
      loadFailed: 'Не удалось загрузить изображение. Файл может быть поврежден',
    },
  },

  resolutions: {
    title: 'Выбрать разрешения',
    subtitle: 'Выберите целевые разрешения устройств',
    deviceTypes: {
      all: 'Все устройства',
      iPhone: 'iPhone',
      iPad: 'iPad',
      'Apple Watch': 'Apple Watch',
    },
    orientations: {
      all: 'Все ориентации',
      portrait: 'Вертикально',
      landscape: 'Горизонтально',
    },
    selectAll: 'Выбрать все',
    deselectAll: 'Снять выбор',
    selected: 'Выбрано разрешений: {count}',
    selectResolution: 'Выбрать',
    dimensions: '{width} × {height}',
  },

  processing: {
    title: 'Обработка изображений',
    subtitle: 'Пожалуйста, подождите, пока мы изменяем размер ваших скриншотов',
    stages: {
      preparing: 'Подготовка...',
      resizing: 'Изменение размера изображений...',
      archiving: 'Создание ZIP архива...',
      complete: 'Готово!',
    },
    status: 'Обработка {current} из {total}',
    currentImage: 'Текущий: {filename}',
    currentResolution: 'Разрешение: {resolution}',
  },

  download: {
    title: 'Готово к загрузке',
    subtitle: 'Ваши скриншоты успешно обработаны',
    button: 'Скачать ZIP',
    downloadingButton: 'Загрузка...',
    totalFiles: '{count} файлов создано',
    zipReady: 'Ваш ZIP-файл готов',
    zipDescription: 'Нажмите ниже, чтобы скачать все обработанные скриншоты',
    stats: {
      totalImages: 'Всего изображений',
      totalResolutions: 'Разрешений',
      fileSize: 'Размер файла',
      processingTime: 'Время обработки',
    },
    startOver: 'Обработать еще',
  },

  settings: {
    title: 'Настройки',
    theme: {
      title: 'Тема',
      light: 'Светлая',
      dark: 'Темная',
      system: 'Системная',
    },
    language: {
      title: 'Язык',
      en: 'English',
      ru: 'Русский',
    },
    imageQuality: {
      title: 'Качество изображений',
      reset: 'Сбросить',
      jpegQuality: 'Качество JPEG',
      jpegDescription: 'Выше значение = лучше качество, больше размер',
      pngCompression: 'Сжатие PNG',
      pngDescription: 'Выше значение = меньше размер, медленнее обработка',
      fillMode: 'Режим заполнения',
      fillModeDescription: 'Как изображение подгоняется под размер',
      fillModes: {
        contain: 'Вписать',
        cover: 'Заполнить',
        stretch: 'Растянуть',
      },
      backgroundColor: 'Цвет фона',
      backgroundDescription: 'Для рамок и JPEG изображений',
    },
  },

  common: {
    cancel: 'Отмена',
    close: 'Закрыть',
    confirm: 'Подтвердить',
    continue: 'Продолжить',
    back: 'Назад',
    next: 'Далее',
    save: 'Сохранить',
    delete: 'Удалить',
    loading: 'Загрузка...',
    error: 'Ошибка',
    success: 'Успешно',
  },

  errors: {
    generic: 'Произошла ошибка. Пожалуйста, попробуйте снова.',
    noImages: 'Пожалуйста, загрузите хотя бы одно изображение',
    noResolutions: 'Пожалуйста, выберите хотя бы одно разрешение',
    processingFailed: 'Не удалось обработать изображения. Пожалуйста, попробуйте снова.',
  },
};
