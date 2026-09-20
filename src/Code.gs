/* =================================================
   1. CONFIGURATION
   ================================================= */

const CONFIG = {

  SHEETS: {
    SUPPLIERS: 'SUPPLIERS',
    PICKUP_REQUESTS: 'PICKUP_REQUESTS',
    WEIGHING_PAYOUT: 'WEIGHING_PAYOUT',
    ROUTES: 'ROUTES',
    DASHBOARD: 'DASHBOARD',
    VALIDATION: 'VALIDATION',
    PRICING: 'PRICING'
  },

  BUSINESS_RULES: {

    // Internal pilot operating threshold.
    // NOT an industry benchmark or break-even point.
    ROUTE_THRESHOLD_L: 50,

    // Supplier collection progress target.
    COLLECTION_TARGET_L: 10
  },

  CACHE: {
    PRICING_SECONDS: 60,
    WEIGHING_QUEUE_SECONDS: 30
  },

  STATUS: {
    PICKUP_PENDING: 'Pending',
    PICKUP_COMPLETED: 'Completed',
    PICKUP_CANCELLED: 'Cancelled'
  }
};
  const SUPPLIER_COL = {
  ID: 0,
  TYPE: 1,
  NAME: 2,
  PHONE: 3,
  AREA: 4,
  ADDRESS: 5,
  TYPICAL_VOLUME: 6,
  COLLECTION_PREFERENCE: 7,
  STATUS: 8,
  CREATED_AT: 9
};


/* =================================================
   2. WEB APP
   ================================================= */

/**
 * Main Web App entry point.
 */
function doGet() {

  return HtmlService
    .createTemplateFromFile('Index')
    .evaluate()
    .setTitle('Jemput Jelantah')
    .setXFrameOptionsMode(
      HtmlService.XFrameOptionsMode.ALLOWALL
    );
}


/**
 * Optional JSON endpoint for external integrations.
 *
 * Main frontend uses google.script.run directly.
 */
function doPost(e) {

  try {

    if (!e || !e.postData || !e.postData.contents) {
      throw new Error('Request body tidak ditemukan.');
    }

    const payload =
      JSON.parse(e.postData.contents || '{}');

    const action = payload.action;
    const data = payload.data || {};

    let result;

    switch (action) {

      case 'createSupplier':
        result = createSupplier(data);
        break;

      case 'createOrGetSupplier':
        result = createOrGetSupplier(data);
        break;

      case 'getSupplier':
        result = getSupplier(data.supplierId);
        break;

      case 'getSupplierByPhone':
        result = getSupplierByPhone(data.phone);
        break;

      case 'createPickupRequest':
        result = createPickupRequest(data);
        break;

      case 'getPickupHistory':
        result = getPickupHistory(data.supplierId);
        break;

      case 'getPickupHistoryByPhone':
        result = getPickupHistoryByPhone(data.phone);
        break;

      case 'getCollectionProgressByPhone':
        result =
          getCollectionProgressByPhone(data.phone);
        break;

      case 'createWeighing':
        result = createWeighing(data);
        break;

      case 'getWeighingQueue':
        result = getWeighingQueue();
        break;

      case 'getDashboard':
        result = getDashboard();
        break;

      case 'getRoutes':
        result = getRoutes();
        break;

      case 'getPricing':
        result = getCurrentPricing();
        break;

      case 'getHomeData':
        result = getHomeData(data.phone);
        break;

      default:
        throw new Error(
          'Unknown action: ' + action
        );
    }

    return jsonResponse({
      success: true,
      data: result
    });

  } catch (error) {

    return jsonResponse({
      success: false,
      message: error.message
    });
  }
}


/**
 * Allows HTML files to include other Apps Script files.
 */
function include(filename) {

  return HtmlService
    .createHtmlOutputFromFile(filename)
    .getContent();
}


/* =================================================
   3. SUPPLIER MANAGEMENT
   ================================================= */

/**
 * Create a new supplier.
 *
 * SUPPLIERS:
 * A Supplier ID
 * B Name
 * C Phone
 * D Supplier Type
 * E Area
 * F Created At
 */
function createSupplier(data) {

  validateRequired(data, [
    'name',
    'phone',
    'supplierType',
    'area'
  ]);

  const sheet =
    getSheet(CONFIG.SHEETS.SUPPLIERS);

  const name =
    String(data.name).trim();

  const phone =
    normalizePhone(data.phone);

  const supplierType =
    String(data.supplierType).trim();

  const area =
    String(data.area).trim();

  const address =
    String(
      data.address ||
      data.adress ||
      ''
    ).trim();

  const rawVolume =
    data.typicalVolumeL !== undefined
      ? data.typicalVolumeL
      : data.typicalVolume;

  const typicalVolumeL =
    rawVolume === undefined ||
    rawVolume === null ||
    rawVolume === ''
      ? ''
      : Number(rawVolume);

  const collectionPreference =
    String(
      data.collectionPreference ||
      'Area Pickup'
    ).trim();

  const status =
    String(
      data.status ||
      'Active'
    ).trim();

  if (!phone) {
    throw new Error(
      'Nomor telepon tidak valid.'
    );
  }

  if (!name) {
    throw new Error(
      'Nama supplier tidak valid.'
    );
  }

  if (!supplierType) {
    throw new Error(
      'Supplier type tidak valid.'
    );
  }

  if (!area) {
    throw new Error(
      'Area tidak valid.'
    );
  }

  const supplierId =
    generateId('SUP');

  const row = [
    supplierId,              // A
    supplierType,            // B
    name,                    // C
    phone,                   // D
    area,                    // E
    address,                 // F
    typicalVolumeL,          // G
    collectionPreference,    // H
    status,                  // I
    new Date()               // J
  ];

  const nextRow =
    sheet.getLastRow() + 1;

  // Phone harus disimpan sebagai text
  // supaya leading zero tidak hilang.
  sheet
    .getRange(nextRow, 4)
    .setNumberFormat('@');

  sheet
    .getRange(
      nextRow,
      1,
      1,
      row.length
    )
    .setValues([row]);

  return {
    supplierId: supplierId,
    supplierType: supplierType,
    name: name,
    phone: phone,
    area: area,
    address: address,
    typicalVolumeL: typicalVolumeL,
    collectionPreference:
      collectionPreference,
    status: status
  };
}


/**
 * Find supplier by ID.
 */
function getSupplier(supplierId) {

  if (!supplierId) {
    throw new Error(
      'Supplier ID wajib diisi.'
    );
  }

  const supplier =
    findSupplier(supplierId);

  if (!supplier) {
    throw new Error(
      'Supplier tidak ditemukan.'
    );
  }

  return supplier;
}


/**
 * Internal supplier lookup by ID.
 */
function findSupplier(supplierId) {

  if (!supplierId) {
    return null;
  }

  const sheet =
    getSheet(CONFIG.SHEETS.SUPPLIERS);

  const values =
    sheet.getDataRange().getValues();

  if (values.length <= 1) {
    return null;
  }

  for (
    let i = 1;
    i < values.length;
    i++
  ) {

    const row = values[i];

    if (
      String(row[SUPPLIER_COL.ID]).trim() ===
      String(supplierId).trim()
    ) {

      return supplierFromRow(row);
    }
  }

  return null;
}

/**
 * Normalize Indonesian phone number.
 *
 * Examples:
 * 08123456789
 * +628123456789
 * 628123456789
 *
 * are normalized to:
 * 08123456789
 */
function normalizePhone(phone) {

  if (
    phone === undefined ||
    phone === null
  ) {
    return '';
  }

  let value =
    String(phone).trim();

  value =
    value.replace(/\s+/g, '');

  value =
    value.replace(/[-().]/g, '');

  if (value.startsWith('+62')) {

    value =
      '0' +
      value.substring(3);

  } else if (value.startsWith('62')) {

    value =
      '0' +
      value.substring(2);
  }

  if (
  /^8\d{8,12}$/.test(value)
) {
  value = '0' + value;
}
  return value;
}


/**
 * Display phone number in normalized format.
 */
function displayPhone(phone) {

  return normalizePhone(phone);
}


/**
 * Find supplier by normalized phone.
 */
function findSupplierByPhone(phone) {

  const normalizedPhone =
    normalizePhone(phone);

  if (!normalizedPhone) {
    return null;
  }

  const sheet =
    getSheet(CONFIG.SHEETS.SUPPLIERS);

  const values =
    sheet.getDataRange().getValues();

  if (values.length <= 1) {
    return null;
  }

  for (let i = 1; i < values.length; i++) {

    // INI WAJIB ADA
    const row = values[i];

    const storedPhone =
      normalizePhone(
        row[SUPPLIER_COL.PHONE]
      );

    if (
      storedPhone === normalizedPhone
    ) {

      return supplierFromRow(row);
    }
  }

  return null;
}

function serializeDate(value) {

  if (!value) {
    return '';
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  return String(value);
}

function supplierFromRow(row) {

  return {
    supplierId:
      row[SUPPLIER_COL.ID],

    supplierType:
      row[SUPPLIER_COL.TYPE],

    name:
      row[SUPPLIER_COL.NAME],

    phone:
      displayPhone(
        row[SUPPLIER_COL.PHONE]
      ),

    area:
      row[SUPPLIER_COL.AREA],

    address:
      row[SUPPLIER_COL.ADDRESS],

    typicalVolumeL:
      Number(
        row[SUPPLIER_COL.TYPICAL_VOLUME]
      ) || 0,

    collectionPreference:
      row[
        SUPPLIER_COL.COLLECTION_PREFERENCE
      ],

    status:
      row[SUPPLIER_COL.STATUS],

    createdAt:
      serializeDate(
        row[SUPPLIER_COL.CREATED_AT]
      )
  };
}


/**
 * Public supplier lookup by phone.
 */
function getSupplierByPhone(phone) {

  const supplier =
    findSupplierByPhone(phone);

  if (!supplier) {

    return {
      success: false,
      message: 'Supplier tidak ditemukan.'
    };
  }

  return {
    success: true,
    supplier: supplier
  };
}


/**
 * Create supplier if new.
 * Otherwise return existing supplier.
 */
function createOrGetSupplier(data) {

  validateRequired(data, [
    'name',
    'phone',
    'supplierType',
    'area'
  ]);

  const normalizedPhone =
    normalizePhone(data.phone);

  if (!normalizedPhone) {
    throw new Error(
      'Nomor telepon tidak valid.'
    );
  }

  const existingSupplier =
    findSupplierByPhone(
      normalizedPhone
    );

  if (existingSupplier) {

    return {
      success: true,
      supplierId:
        existingSupplier.supplierId,
      name:
        existingSupplier.name,
      phone:
        existingSupplier.phone,
      supplierType:
        existingSupplier.supplierType,
      area:
        existingSupplier.area,
      address:
        existingSupplier.address,
      typicalVolumeL:
        existingSupplier.typicalVolumeL,
      collectionPreference:
        existingSupplier.collectionPreference,
      status:
        existingSupplier.status,
      existing: true
    };
  }

  const supplier =
    createSupplier({
      name:
        data.name,

      phone:
        normalizedPhone,

      supplierType:
        data.supplierType,

      area:
        data.area,

      address:
        data.address || data.adress,

      typicalVolumeL:
        data.typicalVolumeL,

      collectionPreference:
        data.collectionPreference,

      status:
        data.status || 'Active'
    });

  return {
    success: true,
    supplierId:
      supplier.supplierId,
    name:
      supplier.name,
    phone:
      supplier.phone,
    supplierType:
      supplier.supplierType,
    area:
      supplier.area,
    address:
      supplier.address,
    typicalVolumeL:
      supplier.typicalVolumeL,
    collectionPreference:
      supplier.collectionPreference,
    status:
      supplier.status,
    existing: false
  };
}

/* =================================================
   4. PICKUP REQUEST
   ================================================= */

/**
 * Create pickup request.
 *
 * PICKUP_REQUESTS:
 * A Request ID
 * B Supplier ID
 * C Supplier Type
 * D Area
 * E Estimated Volume L
 * F Preferred Schedule
 * G Route ID
 * H Status
 * I Created At
 * J Notes
 */
function createPickupRequest(data) {

  validateRequired(data, [
    'supplierId',
    'area',
    'estimatedVolumeL',
    'preferredSchedule'
  ]);

  const estimatedVolumeL =
    Number(data.estimatedVolumeL);

  if (
    !Number.isFinite(estimatedVolumeL) ||
    estimatedVolumeL <= 0
  ) {
    throw new Error(
      'Estimated volume harus lebih besar dari 0 liter.'
    );
  }

  const supplier =
    findSupplier(data.supplierId);

  if (!supplier) {
    throw new Error(
      'Supplier tidak ditemukan.'
    );
  }

  const area =
    String(data.area).trim();

  const preferredSchedule =
    String(data.preferredSchedule).trim();

  if (!area) {
    throw new Error(
      'Area wajib diisi.'
    );
  }

  if (!preferredSchedule) {
    throw new Error(
      'Jadwal pickup wajib diisi.'
    );
  }

  const requestId =
    generateId('REQ');

  const routeId =
    generateRouteId(
      area,
      preferredSchedule
    );

  const sheet =
    getSheet(CONFIG.SHEETS.PICKUP_REQUESTS);

  const row = [
    requestId,
    supplier.supplierId,
    supplier.supplierType,
    area,
    estimatedVolumeL,
    preferredSchedule,
    routeId,
    CONFIG.STATUS.PICKUP_PENDING,
    new Date(),
    data.notes
      ? String(data.notes).trim()
      : ''
  ];

  sheet.appendRow(row);

  updateRoute(routeId);

  return {
    success: true,
    requestId: requestId,
    supplierId: supplier.supplierId,
    supplierName: supplier.name,
    supplierType: supplier.supplierType,
    area: area,
    estimatedVolumeL: estimatedVolumeL,
    preferredSchedule: preferredSchedule,
    routeId: routeId,
    status: CONFIG.STATUS.PICKUP_PENDING
  };
}


/**
 * Find pickup request by request ID.
 */
function findPickupRequest(requestId) {

  if (!requestId) {
    return null;
  }

  const sheet =
    getSheet(CONFIG.SHEETS.PICKUP_REQUESTS);

  const values =
    sheet.getDataRange().getValues();

  if (values.length <= 1) {
    return null;
  }

  for (let i = 1; i < values.length; i++) {

    const row = values[i];

    if (
      String(row[0]).trim() ===
      String(requestId).trim()
    ) {

      return {
        requestId: row[0],
        supplierId: row[1],
        supplierType: row[2],
        area: row[3],
        estimatedVolumeL:
          Number(row[4]) || 0,
        preferredSchedule: row[5],
        routeId: row[6],
        status: row[7],
        createdAt: row[8],
        notes: row[9]
      };
    }
  }

  return null;
}


/**
 * Update pickup request status.
 */
function updatePickupStatus(
  requestId,
  newStatus
) {

  const allowedStatuses = [
    CONFIG.STATUS.PICKUP_PENDING,
    CONFIG.STATUS.PICKUP_COMPLETED,
    CONFIG.STATUS.PICKUP_CANCELLED
  ];

  if (
    allowedStatuses.indexOf(newStatus) === -1
  ) {

    throw new Error(
      'Status pickup tidak valid.'
    );
  }

  const sheet =
    getSheet(CONFIG.SHEETS.PICKUP_REQUESTS);

  const values =
    sheet.getDataRange().getValues();

  for (let i = 1; i < values.length; i++) {

    if (
      String(values[i][0]).trim() ===
      String(requestId).trim()
    ) {

      sheet
        .getRange(i + 1, 8)
        .setValue(newStatus);

      updateRoute(values[i][6]);

      return {
        success: true,
        requestId: requestId,
        status: newStatus
      };
    }
  }

  throw new Error(
    'Pickup request tidak ditemukan.'
  );
}


/**
 * Get pickup history by supplier ID.
 */
function getPickupHistory(supplierId) {

  if (!supplierId) {
    throw new Error(
      'Supplier ID wajib diisi.'
    );
  }

  const sheet =
    getSheet(CONFIG.SHEETS.PICKUP_REQUESTS);

  const values =
    sheet.getDataRange().getValues();

  const history = [];

  for (let i = 1; i < values.length; i++) {

    const row = values[i];

    if (
      String(row[1]).trim() ===
      String(supplierId).trim()
    ) {

      history.push({
        requestId: row[0],
        supplierType: row[2],
        area: row[3],
        estimatedVolumeL:
          Number(row[4]) || 0,
        preferredSchedule: row[5],
        routeId: row[6],
        status: row[7],
        createdAt:
           serializeDate(row[8]),
        notes: row[9]
      });
    }
  }

  return history;
}


/**
 * Get pickup history using phone.
 */
function getPickupHistoryByPhone(phone) {

  const supplier =
    findSupplierByPhone(phone);

  if (!supplier) {

    return {
      success: true,
      found: false,
      supplier: null,
      history: [],
      message:
        'Nomor telepon belum terdaftar.'
    };
  }

  const history =
    getPickupHistory(
      supplier.supplierId
    );

  return {
    success: true,
    found: true,
    supplier: supplier,
    history: history
  };
}


/* =================================================
   5. COLLECTION PROGRESS
   ================================================= */

/**
 * Calculate current collection progress
 * for a supplier.
 *
 * This is an internal UX/product rule,
 * not a business validation threshold.
 */
function getCollectionProgressByPhone(phone) {

  const supplier =
    findSupplierByPhone(phone);

  if (!supplier) {

    return {
      success: false,
      message:
        'Supplier tidak ditemukan.'
    };
  }

  const history =
    getPickupHistory(
      supplier.supplierId
    );

  let collectedLiters = 0;

  history.forEach(function(request) {

    if (
      request.status !==
        CONFIG.STATUS.PICKUP_COMPLETED &&
      request.status !==
        CONFIG.STATUS.PICKUP_CANCELLED
    ) {

      collectedLiters +=
        Number(request.estimatedVolumeL) || 0;
    }
  });

  const targetLiters =
    CONFIG.BUSINESS_RULES.COLLECTION_TARGET_L;

  const remainingLiters =
    Math.max(
      targetLiters - collectedLiters,
      0
    );

  const progressPercent =
    targetLiters > 0
      ? Math.min(
          Math.round(
            (
              collectedLiters /
              targetLiters
            ) * 100
          ),
          100
        )
      : 0;

  return {
    success: true,
    supplierId:
      supplier.supplierId,
    collectedLiters:
      collectedLiters,
    targetLiters:
      targetLiters,
    remainingLiters:
      remainingLiters,
    progressPercent:
      progressPercent
  };
}


/* =================================================
   6. ROUTE AGGREGATION
   ================================================= */

/**
 * Generate route ID from area + schedule.
 */
function generateRouteId(
  area,
  schedule
) {

  const normalizedArea =
    String(area || '')
      .trim()
      .toUpperCase()
      .replace(/\s+/g, '-');

  const normalizedSchedule =
    String(schedule || '')
      .trim()
      .toUpperCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '');

  return (
    'ROUTE-' +
    normalizedArea +
    '-' +
    normalizedSchedule
  );
}


/**
 * Recalculate a route from pickup requests.
 *
 * Route logic:
 *
 * Estimated volume < threshold
 * → Open
 *
 * Estimated volume >= threshold
 * → Ready
 *
 * Some active requests completed
 * → In Progress
 *
 * All active requests completed
 * + actual volume > 0
 * → Completed
 *
 * Cancelled requests are excluded
 * from active route completion logic.
 */
function updateRoute(routeId) {

  if (!routeId) {
    return null;
  }

  const requestSheet =
    getSheet(CONFIG.SHEETS.PICKUP_REQUESTS);

  const requestValues =
    requestSheet
      .getDataRange()
      .getValues();

  const routeRequests = [];

  for (
    let i = 1;
    i < requestValues.length;
    i++
  ) {

    const row =
      requestValues[i];

    if (
      String(row[6]) ===
      String(routeId)
    ) {

      routeRequests.push({
        requestId: row[0],
        supplierId: row[1],
        supplierType: row[2],
        area: row[3],
        estimatedVolumeL:
          Number(row[4]) || 0,
        schedule: row[5],
        status: row[7]
      });
    }
  }

  if (routeRequests.length === 0) {
    return null;
  }

  const activeRequests =
    routeRequests.filter(function(request) {

      return (
        request.status !==
          CONFIG.STATUS.PICKUP_CANCELLED
      );
    });

  if (activeRequests.length === 0) {

    const cancelledRoute = {
      routeId: routeId,
      area: routeRequests[0].area,
      schedule: routeRequests[0].schedule,
      umkmCount: 0,
      householdCount: 0,
      estimatedLiters: 0,
      actualLiters: 0,
      supplierCount: 0,
      routeStatus:
        CONFIG.STATUS.PICKUP_CANCELLED,
      revenue: 0,
      payoutCost: 0,
      contributionMargin: 0,
      litersPerRoute: 0
    };

    saveRouteRow(cancelledRoute);

    return cancelledRoute;
  }

  const area =
    activeRequests[0].area;

  const schedule =
    activeRequests[0].schedule;

  let umkmCount = 0;
  let householdCount = 0;
  let estimatedLiters = 0;
  let completedCount = 0;

  activeRequests.forEach(function(request) {

  estimatedLiters +=
    Number(request.estimatedVolumeL) || 0;

  const type =
    String(
      request.supplierType || ''
    ).toLowerCase();

  if (
    type.includes('umkm')
  ) {

    umkmCount++;

  } else if (
    type.includes('rumah') ||
    type.includes('household')
  ) {

    householdCount++;
  }

  if (
    request.status ===
    CONFIG.STATUS.PICKUP_COMPLETED
  ) {

    completedCount++;
  }
});

  const supplierCount =
    activeRequests.length;

  const actualLiters =
    getActualLiters(routeId);

  let routeStatus =
    'Open';

  if (
    completedCount === supplierCount &&
    actualLiters > 0
  ) {

    routeStatus =
      'Completed';

  } else if (
    completedCount > 0
  ) {

    routeStatus =
      'In Progress';

  } else if (
    estimatedLiters >=
    CONFIG.BUSINESS_RULES.ROUTE_THRESHOLD_L
  ) {

    routeStatus =
      'Ready';

  } else {

    routeStatus =
      'Open';
  }

  let buyerPricePerL = 0;

  try {

    const pricing =
      getActivePricing();

    buyerPricePerL =
      Number(pricing.buyerPricePerL) || 0;

  } catch (error) {

    // Pricing is required for payout,
    // but route records can still exist
    // when pricing has not been configured.
    buyerPricePerL = 0;
  }

  const revenue =
    actualLiters *
    buyerPricePerL;

  const payoutCost =
    getRouteSupplierPayout(routeId);

  const contributionMargin =
    revenue -
    payoutCost;

  const litersPerRoute =
    actualLiters > 0
      ? actualLiters
      : estimatedLiters;

  const routeData = {

    routeId: routeId,

    area: area,

    schedule: schedule,

    umkmCount: umkmCount,

    householdCount: householdCount,

    estimatedLiters:
      estimatedLiters,

    actualLiters:
      actualLiters,

    supplierCount:
      supplierCount,

    routeStatus:
      routeStatus,

    revenue:
      revenue,

    payoutCost:
      payoutCost,

    contributionMargin:
      contributionMargin,

    litersPerRoute:
      litersPerRoute
  };

  saveRouteRow(routeData);

  return routeData;
}


/**
 * Save or update route row.
 *
 * ROUTES:
 * A Route ID
 * B Area
 * C Schedule
 * D UMKM Count
 * E Household Count
 * F Estimated Liters
 * G Actual Liters
 * H Supplier Count
 * I Route Status
 * J Revenue
 * K Payout Cost
 * L Contribution Margin
 * M Liters Per Route
 */
function saveRouteRow(routeData) {

  const routeSheet =
    getSheet(CONFIG.SHEETS.ROUTES);

  const routeRow = [

    routeData.routeId,

    routeData.area,

    routeData.schedule,

    routeData.umkmCount,

    routeData.householdCount,

    routeData.estimatedLiters,

    routeData.actualLiters,

    routeData.supplierCount,

    routeData.routeStatus,

    routeData.revenue,

    routeData.payoutCost,

    routeData.contributionMargin,

    routeData.litersPerRoute
  ];

  const existingRow =
    findRouteRow(
      routeData.routeId
    );

  if (existingRow) {

    routeSheet
      .getRange(
        existingRow,
        1,
        1,
        routeRow.length
      )
      .setValues([routeRow]);

  } else {

    routeSheet.appendRow(routeRow);
  }
}


/**
 * Find route row by route ID.
 */
function findRouteRow(routeId) {

  const sheet =
    getSheet(CONFIG.SHEETS.ROUTES);

  const values =
    sheet.getDataRange().getValues();

  for (
    let i = 1;
    i < values.length;
    i++
  ) {

    if (
      String(values[i][0]) ===
      String(routeId)
    ) {

      return i + 1;
    }
  }

  return null;
}


/**
 * Calculate actual liters for a route.
 *
 * WEIGHING_PAYOUT:
 * C Route ID
 * F Actual Volume L
 */
function getActualLiters(routeId) {

  const sheet =
    getSheet(CONFIG.SHEETS.WEIGHING_PAYOUT);

  const values =
    sheet.getDataRange().getValues();

  let total = 0;

  for (
    let i = 1;
    i < values.length;
    i++
  ) {

    const row =
      values[i];

    if (
      String(row[2]) ===
      String(routeId)
    ) {

      total +=
        Number(row[5]) || 0;
    }
  }

  return total;
}


/**
 * Calculate total supplier payout for a route.
 *
 * WEIGHING_PAYOUT:
 * C Route ID
 * H Total Payout
 */
function getRouteSupplierPayout(routeId) {

  const sheet =
    getSheet(CONFIG.SHEETS.WEIGHING_PAYOUT);

  const values =
    sheet.getDataRange().getValues();

  let total = 0;

  for (
    let i = 1;
    i < values.length;
    i++
  ) {

    const row =
      values[i];

    if (
      String(row[2]) ===
      String(routeId)
    ) {

      total +=
        Number(row[7]) || 0;
    }
  }

  return total;
}


/**
 * Get all routes.
 */
function getRoutes() {

  const sheet =
    getSheet(CONFIG.SHEETS.ROUTES);

  const values =
    sheet.getDataRange().getValues();

  if (values.length <= 1) {
    return [];
  }

  return values
    .slice(1)
    .map(function(row) {

      return {

        routeId: row[0],

        area: row[1],

        schedule: row[2],

        umkmCount:
          Number(row[3]) || 0,

        householdCount:
          Number(row[4]) || 0,

        estimatedLiters:
          Number(row[5]) || 0,

        actualLiters:
          Number(row[6]) || 0,

        supplierCount:
          Number(row[7]) || 0,

        routeStatus:
          row[8],

        revenue:
          Number(row[9]) || 0,

        payoutCost:
          Number(row[10]) || 0,

        contributionMargin:
          Number(row[11]) || 0,

        litersPerRoute:
          Number(row[12]) || 0
      };
    });
}


/* =================================================
   7. WEIGHING & PAYOUT
   ================================================= */

/**
 * Create weighing transaction.
 *
 * IMPORTANT:
 * Frontend price is NOT trusted.
 * Active supplier payout from PRICING
 * is the backend source of truth.
 *
 * WEIGHING_PAYOUT:
 * A Transaction ID
 * B Request ID
 * C Route ID
 * D Supplier ID
 * E Estimated Volume L
 * F Actual Volume L
 * G Payout / L
 * H Total Payout
 * I Weighed At
 * J Payment Status
 */
function createWeighing(data) {

  validateRequired(data, [
    'requestId',
    'actualVolumeL'
  ]);

  const lock =
    LockService.getScriptLock();

  lock.waitLock(10000);

  try {

    const actualVolumeL =
      Number(data.actualVolumeL);

    if (
      !Number.isFinite(actualVolumeL) ||
      actualVolumeL <= 0
    ) {

      throw new Error(
        'Actual volume harus lebih besar dari 0 liter.'
      );
    }

    const request =
      findPickupRequest(
        data.requestId
      );

    if (!request) {

      throw new Error(
        'Pickup request tidak ditemukan.'
      );
    }

    if (
      request.status ===
        CONFIG.STATUS.PICKUP_COMPLETED ||
      request.status ===
        CONFIG.STATUS.PICKUP_CANCELLED
    ) {

      throw new Error(
        'Pickup request sudah tidak dapat ditimbang.'
      );
    }

    const weighingSheet =
      getSheet(
        CONFIG.SHEETS.WEIGHING_PAYOUT
      );

    const weighingValues =
      weighingSheet
        .getDataRange()
        .getValues();

    // One request can only have
    // one weighing record.
    for (
      let i = 1;
      i < weighingValues.length;
      i++
    ) {

      if (
        String(weighingValues[i][1]) ===
        String(data.requestId)
      ) {

        throw new Error(
          'Request ini sudah memiliki hasil penimbangan.'
        );
      }
    }

    /*
     * Backend pricing is the source of truth.
     * Any frontend pricePerL value is ignored.
     */
    const pricing =
      getActivePricing();

    const supplierPayoutPerL =
      Number(
        pricing.supplierPayoutPerL
      );

    if (
      !Number.isFinite(
        supplierPayoutPerL
      ) ||
      supplierPayoutPerL <= 0
    ) {

      throw new Error(
        'Harga payout supplier aktif tidak valid.'
      );
    }

    const totalPayout =
      actualVolumeL *
      supplierPayoutPerL;

    const transactionId =
      generateId('TXN');

    /*
     * Payment status is controlled by backend.
     * MVP default is Pending.
     */
    const paymentStatus =
      'Pending';

    const row = [

      transactionId,

      request.requestId,

      request.routeId,

      request.supplierId,

      request.estimatedVolumeL,

      actualVolumeL,

      supplierPayoutPerL,

      totalPayout,

      new Date(),

      paymentStatus
    ];

    weighingSheet.appendRow(row);

    // Mark pickup completed.
    updatePickupStatus(
      request.requestId,
      CONFIG.STATUS.PICKUP_COMPLETED
    );

    // Refresh route calculations.
    updateRoute(
      request.routeId
    );

    // Clear weighing queue cache.
    CacheService
      .getScriptCache()
      .remove(
        'JEMPUT_JELANTAH_WEIGHING_QUEUE'
      );

    return {

      success: true,

      transactionId:
        transactionId,

      requestId:
        request.requestId,

      routeId:
        request.routeId,

      supplierId:
        request.supplierId,

      estimatedVolumeL:
        request.estimatedVolumeL,

      actualVolumeL:
        actualVolumeL,

      supplierPayoutPerL:
        supplierPayoutPerL,

      totalPayout:
        totalPayout,

      paymentStatus:
        paymentStatus
    };

  } finally {

    lock.releaseLock();
  }
}


/**
 * Get requests that are ready for weighing.
 *
 * Returns a direct array because
 * Scripts.html expects an array.
 */
function getWeighingQueue() {

  const cache =
    CacheService.getScriptCache();

  const cacheKey =
    'JEMPUT_JELANTAH_WEIGHING_QUEUE';

  const cached =
    cache.get(cacheKey);

  if (cached) {
    return JSON.parse(cached);
  }

  const requestSheet =
    getSheet(
      CONFIG.SHEETS.PICKUP_REQUESTS
    );

  const values =
    requestSheet
      .getDataRange()
      .getValues();

  const queue = [];

  for (
    let i = 1;
    i < values.length;
    i++
  ) {

    const row =
      values[i];

    const status =
      String(row[7] || '');

    if (
      status ===
        CONFIG.STATUS.PICKUP_COMPLETED ||
      status ===
        CONFIG.STATUS.PICKUP_CANCELLED
    ) {
      continue;
    }

    const supplier =
      findSupplier(row[1]);

    queue.push({

      requestId:
        row[0],

      supplierId:
        row[1],

      supplierName:
        supplier
          ? supplier.name
          : 'Unknown Supplier',

      supplierType:
        row[2],

      area:
        row[3],

      estimatedVolumeL:
        Number(row[4]) || 0,

      preferredSchedule:
        row[5],

      routeId:
        row[6],

      status:
        status
    });
  }

  cache.put(
    cacheKey,
    JSON.stringify(queue),
    CONFIG.CACHE.WEIGHING_QUEUE_SECONDS
  );

  return queue;
}


/* =================================================
   8. PRICING
   ================================================= */

/**
 * Get active pricing.
 *
 * PRICING:
 * A Effective Date
 * B Reference Price / L
 * C Supplier Payout / L
 * D Source
 * E Status
 *
 * The latest effective ACTIVE record is used.
 *
 * IMPORTANT:
 * This is a pricing reference stored in the MVP.
 * It is NOT automatically a live market API.
 */
function getActivePricing() {

  const sheet =
    getSheet(CONFIG.SHEETS.PRICING);

  const values =
    sheet.getDataRange().getValues();

  if (values.length <= 1) {

    throw new Error(
      'PRICING sheet belum memiliki data.'
    );
  }

  const headers =
    values[0].map(function(header) {

      return String(header)
        .trim()
        .toLowerCase();
    });

  const effectiveIndex =
    headers.indexOf(
      'effective date'
    );

  const referenceIndex =
    headers.indexOf(
      'reference price/l'
    );

  const payoutIndex =
    headers.indexOf(
      'supplier payout/l'
    );

  const sourceIndex =
    headers.indexOf(
      'source'
    );

  const statusIndex =
    headers.indexOf(
      'status'
    );

  if (
    effectiveIndex === -1 ||
    referenceIndex === -1 ||
    payoutIndex === -1 ||
    sourceIndex === -1 ||
    statusIndex === -1
  ) {

    throw new Error(
      'Header PRICING tidak sesuai schema.'
    );
  }

  const activeRows = [];

  for (
    let i = 1;
    i < values.length;
    i++
  ) {

    const row =
      values[i];

    const status =
      String(
        row[statusIndex] || ''
      )
        .trim()
        .toLowerCase();

    if (status !== 'active') {
      continue;
    }

    let effectiveDate;

    if (
      row[effectiveIndex] instanceof Date
    ) {

      effectiveDate =
        row[effectiveIndex];

    } else {

      effectiveDate =
        new Date(
          row[effectiveIndex]
        );
    }

    const effectiveTime =
      effectiveDate instanceof Date &&
      !isNaN(
        effectiveDate.getTime()
      )
        ? effectiveDate.getTime()
        : 0;

    const referencePricePerL =
      Number(
        row[referenceIndex]
      );

    const supplierPayoutPerL =
      Number(
        row[payoutIndex]
      );

    activeRows.push({

      effectiveDate:
        effectiveDate,

      effectiveTime:
        effectiveTime,

      referencePricePerL:
        Number.isFinite(
          referencePricePerL
        )
          ? referencePricePerL
          : 0,

      supplierPayoutPerL:
        Number.isFinite(
          supplierPayoutPerL
        )
          ? supplierPayoutPerL
          : 0,

      source:
        row[sourceIndex]
    });
  }

  if (activeRows.length === 0) {

    throw new Error(
      'Tidak ada pricing aktif.'
    );
  }

  // Latest effective ACTIVE record wins.
  activeRows.sort(
    function(a, b) {

      return (
        b.effectiveTime -
        a.effectiveTime
      );
    }
  );

  const active =
    activeRows[0];

  if (
    active.supplierPayoutPerL <= 0
  ) {

    throw new Error(
      'Supplier payout pada pricing aktif tidak valid.'
    );
  }

  return {

    referencePricePerL:
      active.referencePricePerL,

    supplierPayoutPerL:
      active.supplierPayoutPerL,

    buyerPricePerL:
      active.referencePricePerL,

    source:
      active.source,

    effectiveDate:
      active.effectiveDate
  };
}


/**
 * Public pricing function for frontend.
 *
 * Cached for short periods.
 */
function getCurrentPricing() {

  const cache =
    CacheService.getScriptCache();

  const cacheKey =
    'JEMPUT_JELANTAH_CURRENT_PRICING';

  const cached =
    cache.get(cacheKey);

  if (cached) {
    return JSON.parse(cached);
  }

  try {

    const pricing =
      getActivePricing();

    const timezone =
      Session.getScriptTimeZone();

    let effectiveDate = '';

    if (
      pricing.effectiveDate instanceof Date &&
      !isNaN(
        pricing.effectiveDate.getTime()
      )
    ) {

      effectiveDate =
        Utilities.formatDate(
          pricing.effectiveDate,
          timezone,
          'dd MMM yyyy HH:mm'
        );
    }

    const result = {

      success: true,

      referencePricePerL:
        pricing.referencePricePerL,

      supplierPayoutPerL:
        pricing.supplierPayoutPerL,

      source:
        pricing.source,

      effectiveDate:
        effectiveDate
    };

    cache.put(
      cacheKey,
      JSON.stringify(result),
      CONFIG.CACHE.PRICING_SECONDS
    );

    return result;

  } catch (error) {

    return {

      success: false,

      message:
        error.message
    };
  }
}


/**
 * Estimate supplier payout for a given volume.
 */
function getEstimatedPayout(volumeL) {

  const volume =
    Number(volumeL);

  if (
    !Number.isFinite(volume) ||
    volume <= 0
  ) {

    return {

      success: false,

      message:
        'Volume tidak valid.'
    };
  }

  const pricing =
    getActivePricing();

  const payoutPerL =
    Number(
      pricing.supplierPayoutPerL
    ) || 0;

  const estimatedPayout =
    volume *
    payoutPerL;

  return {

    success: true,

    volumeL:
      volume,

    referencePricePerL:
      pricing.referencePricePerL,

    supplierPayoutPerL:
      payoutPerL,

    estimatedPayout:
      estimatedPayout,

    source:
      pricing.source,

    note:
      'Estimasi payout menggunakan harga payout supplier, bukan harga referensi pasar.'
  };
}


/* =================================================
   9. HOME DATA
   ================================================= */

/**
 * Consolidated homepage data.
 *
 * Phone is optional.
 */
function getHomeData(phone) {

  const pricing =
    getCurrentPricing();

  let progress = null;

  if (
    phone &&
    String(phone).trim()
  ) {

    progress =
      getCollectionProgressByPhone(
        phone
      );
  }

  return {

    success: true,

    pricing:
      pricing,

    progress:
      progress
  };
}


/* =================================================
   10. DASHBOARD
   ================================================= */

/**
 * Calculate dashboard metrics from
 * current spreadsheet records.
 *
 * IMPORTANT:
 * These metrics describe records available
 * in the MVP.
 *
 * They are NOT automatically:
 * - market validation
 * - business traction
 * - validated experiment results
 */
function getDashboard() {

  const supplierSheet =
    getSheet(
      CONFIG.SHEETS.SUPPLIERS
    );

  const requestSheet =
    getSheet(
      CONFIG.SHEETS.PICKUP_REQUESTS
    );

  const weighingSheet =
    getSheet(
      CONFIG.SHEETS.WEIGHING_PAYOUT
    );

  const routeSheet =
    getSheet(
      CONFIG.SHEETS.ROUTES
    );

  const suppliers =
    supplierSheet
      .getDataRange()
      .getValues();

  const requests =
    requestSheet
      .getDataRange()
      .getValues();

  const weighings =
    weighingSheet
      .getDataRange()
      .getValues();

  const routes =
    routeSheet
      .getDataRange()
      .getValues();


  /* -----------------------------
     Supplier metrics
     ----------------------------- */

  const supplierRows =
    suppliers.slice(1);

  const totalSuppliers =
    supplierRows.length;

  let activeUmkm = 0;
  let households = 0;

  supplierRows.forEach(
    function(row) {

      const type =
        String(row[3] || '')
          .toLowerCase();

      if (
        type.includes('umkm')
      ) {

        activeUmkm++;

      } else if (
        type.includes('household') ||
        type.includes('rumah')
      ) {

        households++;
      }
    }
  );


  /* -----------------------------
     Pickup request metrics
     ----------------------------- */

  const requestRows =
    requests.slice(1);

  const pickupRequests =
    requestRows.length;

  let completedPickups = 0;
  let estimatedLiters = 0;

  requestRows.forEach(
    function(row) {

      estimatedLiters +=
        Number(row[4]) || 0;

      if (
        row[7] ===
        CONFIG.STATUS.PICKUP_COMPLETED
      ) {

        completedPickups++;
      }
    }
  );


  /* -----------------------------
     Weighing metrics
     ----------------------------- */

  const weighingRows =
    weighings.slice(1);

  let actualLiters = 0;
  let totalPayout = 0;

  weighingRows.forEach(
    function(row) {

      actualLiters +=
        Number(row[5]) || 0;

      totalPayout +=
        Number(row[7]) || 0;
    }
  );


  /* -----------------------------
     Route metrics
     ----------------------------- */

  const routeRows =
    routes.slice(1);

  const totalRoutes =
    routeRows.length;

  let completedRoutes = 0;
  let routesAtThreshold = 0;
  let totalRevenue = 0;
  let contributionMargin = 0;

  routeRows.forEach(
    function(row) {

      const status =
        String(row[8] || '');

      const liters =
        Number(row[12]) || 0;

      if (
        status === 'Completed'
      ) {

        completedRoutes++;
      }

      if (
        liters >=
        CONFIG.BUSINESS_RULES.ROUTE_THRESHOLD_L
      ) {

        routesAtThreshold++;
      }

      totalRevenue +=
        Number(row[9]) || 0;

      contributionMargin +=
        Number(row[11]) || 0;
    }
  );


  /*
   * Note:
   * This is average actual liters per route
   * when actual volume exists.
   *
   * For routes without actual volume,
   * the route-level liters value may still
   * use estimated volume.
   */
  const averageLitersPerRoute =
    totalRoutes > 0
      ? actualLiters / totalRoutes
      : 0;

  const routeThresholdRate =
    totalRoutes > 0
      ? routesAtThreshold /
        totalRoutes
      : 0;

  const completionRate =
    pickupRequests > 0
      ? completedPickups /
        pickupRequests
      : 0;


  /* -----------------------------
     Repeat contribution
     ----------------------------- */

  const supplierRequestCount = {};

  requestRows.forEach(
    function(row) {

      const supplierId =
        String(row[1]);

      if (!supplierId) {
        return;
      }

      supplierRequestCount[
        supplierId
      ] =
        (
          supplierRequestCount[
            supplierId
          ] || 0
        ) + 1;
    }
  );

  let repeatSuppliers = 0;

  Object.keys(
    supplierRequestCount
  ).forEach(
    function(supplierId) {

      if (
        supplierRequestCount[
          supplierId
        ] > 1
      ) {

        repeatSuppliers++;
      }
    }
  );

  const repeatContributionRate =
    totalSuppliers > 0
      ? repeatSuppliers /
        totalSuppliers
      : 0;


  /* -----------------------------
     Pricing metrics
     ----------------------------- */

  let averagePayoutPerLiter = 0;

  if (actualLiters > 0) {

    averagePayoutPerLiter =
      totalPayout /
      actualLiters;
  }

  const contributionMarginPerLiter =
    actualLiters > 0
      ? contributionMargin /
        actualLiters
      : 0;

  const contributionMarginRate =
    totalRevenue > 0
      ? contributionMargin /
        totalRevenue
      : 0;


  /* -----------------------------
     Dashboard result
     ----------------------------- */

  const dashboard = {

    totalSuppliers:
      totalSuppliers,

    activeUmkm:
      activeUmkm,

    households:
      households,

    pickupRequests:
      pickupRequests,

    completedPickups:
      completedPickups,

    estimatedLiters:
      estimatedLiters,

    actualLiters:
      actualLiters,

    totalRoutes:
      totalRoutes,

    completedRoutes:
      completedRoutes,

    averageLitersPerRoute:
      averageLitersPerRoute,

    routesAtThreshold:
      routesAtThreshold,

    routeThresholdRate:
      routeThresholdRate,

    completionRate:
      completionRate,

    repeatContributionRate:
      repeatContributionRate,

    averagePayoutPerLiter:
      averagePayoutPerLiter,

    totalPayout:
      totalPayout,

    totalRevenue:
      totalRevenue,

    contributionMargin:
      contributionMargin,

    contributionMarginPerLiter:
      contributionMarginPerLiter,

    contributionMarginRate:
      contributionMarginRate,

    routeThresholdL:
      CONFIG.BUSINESS_RULES.ROUTE_THRESHOLD_L,

    dataStatus:
      'Recorded'
  };


  /* -----------------------------
     Write dashboard snapshot
     ----------------------------- */

  const dashboardSheet =
    getSheet(
      CONFIG.SHEETS.DASHBOARD
    );

  const timestamp =
    new Date();

  const dashboardRows = [

    [
      'Metric',
      'Value',
      'Status',
      'Updated At'
    ],

    [
      'Total Suppliers',
      totalSuppliers,
      'Recorded',
      timestamp
    ],

    [
      'UMKM Suppliers',
      activeUmkm,
      'Recorded',
      timestamp
    ],

    [
      'Household Suppliers',
      households,
      'Recorded',
      timestamp
    ],

    [
      'Pickup Requests',
      pickupRequests,
      'Recorded',
      timestamp
    ],

    [
      'Completed Pickups',
      completedPickups,
      'Recorded',
      timestamp
    ],

    [
      'Estimated Liters',
      estimatedLiters,
      'Recorded',
      timestamp
    ],

    [
      'Actual Liters',
      actualLiters,
      'Recorded',
      timestamp
    ],

    [
      'Average Liters / Route',
      averageLitersPerRoute,
      'Recorded',
      timestamp
    ],

    [
      'Routes ≥ Threshold',
      routesAtThreshold,
      'Recorded',
      timestamp
    ],

    [
      'Pickup Completion Rate',
      completionRate,
      'Recorded',
      timestamp
    ],

    [
      'Repeat Contribution Rate',
      repeatContributionRate,
      'Recorded',
      timestamp
    ],

    [
      'Average Supplier Payout / L',
      averagePayoutPerLiter,
      'Recorded',
      timestamp
    ],

    [
      'Total Supplier Payout',
      totalPayout,
      'Recorded',
      timestamp
    ],

    [
      'Total Revenue',
      totalRevenue,
      'Recorded',
      timestamp
    ],

    [
      'Contribution Margin',
      contributionMargin,
      'Calculated',
      timestamp
    ],

    [
      'Contribution Margin / L',
      contributionMarginPerLiter,
      'Calculated',
      timestamp
    ],

    [
      'Contribution Margin Rate',
      contributionMarginRate,
      'Calculated',
      timestamp
    ]
  ];

  dashboardSheet.clearContents();

  dashboardSheet
    .getRange(
      1,
      1,
      dashboardRows.length,
      dashboardRows[0].length
    )
    .setValues(
      dashboardRows
    );

  return dashboard;
}


/* =================================================
   11. VALIDATION & HELPERS
   ================================================= */

/**
 * Return a Google Sheet by name.
 */
function getSheet(sheetName) {

  const spreadsheet =
    SpreadsheetApp
      .getActiveSpreadsheet();

  if (!spreadsheet) {

    throw new Error(
      'Spreadsheet aktif tidak ditemukan.'
    );
  }

  const sheet =
    spreadsheet
      .getSheetByName(sheetName);

  if (!sheet) {

    throw new Error(
      'Sheet tidak ditemukan: ' +
      sheetName
    );
  }

  return sheet;
}


/**
 * Generate unique ID.
 *
 * Timestamp + random suffix
 * is sufficient for this MVP.
 */
function generateId(prefix) {

  return (
    prefix +
    '-' +
    Date.now() +
    '-' +
    Math.floor(
      Math.random() * 1000
    )
  );
}


/**
 * Validate required object fields.
 */
function validateRequired(
  data,
  fields
) {

  if (!data) {

    throw new Error(
      'Data tidak ditemukan.'
    );
  }

  fields.forEach(
    function(field) {

      const value =
        data[field];

      if (
        value === undefined ||
        value === null ||
        String(value).trim() === ''
      ) {

        throw new Error(
          field +
          ' wajib diisi.'
        );
      }
    }
  );
}


/**
 * Return JSON response for doPost.
 */
function jsonResponse(data) {

  return ContentService
    .createTextOutput(
      JSON.stringify(data)
    )
    .setMimeType(
      ContentService.MimeType.JSON
    );
}

function debugSupplierByPhone() {

  const testPhone = '081183412877'; // ganti dengan nomor yang ADA di sheet

  const normalized =
    normalizePhone(testPhone);

  const sheet =
    getSheet(CONFIG.SHEETS.SUPPLIERS);

  const values =
    sheet.getDataRange().getValues();

  Logger.log('INPUT        : ' + testPhone);
  Logger.log('NORMALIZED   : ' + normalized);
  Logger.log('TOTAL ROWS   : ' + values.length);

  for (let i = 1; i < values.length; i++) {

    const row = values[i];

    const rawPhone =
      row[SUPPLIER_COL.PHONE];

    const storedPhone =
      normalizePhone(rawPhone);

    Logger.log(
      'ROW ' + (i + 1) +
      ' | NAME=' + row[SUPPLIER_COL.NAME] +
      ' | RAW=' + rawPhone +
      ' | NORMALIZED=' + storedPhone
    );

    if (storedPhone === normalized) {

      Logger.log('MATCH FOUND');

      Logger.log(
        JSON.stringify(
          supplierFromRow(row)
        )
      );

      return supplierFromRow(row);
    }
  }

  Logger.log('NO MATCH FOUND');

  return null;
}

function debugPickupStatus() {

  const result =
    getPickupHistoryByPhone(
      '081183412877'
    );

  Logger.log(
    JSON.stringify(result)
  );

  return result;
}
