/*************************************************
 * JEMPUT JELANTAH — MVP BACKEND
 * Google Apps Script + Google Sheets
 *************************************************/

const CONFIG = {
  SHEETS: {
    SUPPLIERS: 'SUPPLIERS',
    PICKUP_REQUESTS: 'PICKUP_REQUESTS',
    WEIGHING_PAYOUT: 'WEIGHING_PAYOUT',
    ROUTES: 'ROUTES',
    DASHBOARD: 'DASHBOARD',
    VALIDATION: 'VALIDATION',
    PRICING: 'PRICING'
  }
};


/**
 * =========================
 * WEB APP ENTRY POINT
 * =========================
 */

function doGet() {
  return HtmlService
    .createHtmlOutputFromFile('Index')
    .setTitle('Jemput Jelantah')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function doPost(e) {
  try {

    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse({
        success: false,
        error: 'Request body is empty.'
      });
    }

    const data =
      JSON.parse(e.postData.contents);

    const action =
      data.action;

    switch (action) {

      // ==========================================
      // SUPPLIER
      // ==========================================

      case 'createSupplier':
        return jsonResponse(
          createSupplier(data)
        );


      case 'createOrGetSupplier':
        return jsonResponse(
          createOrGetSupplier(data)
        );


      case 'getSupplier':
        return jsonResponse(
          getSupplier(data.supplierId)
        );


      case 'getSupplierByPhone':
        return jsonResponse(
          getSupplierByPhone(data.phone)
        );


      // ==========================================
      // PICKUP
      // ==========================================

      case 'createPickupRequest':
        return jsonResponse(
          createPickupRequest(data)
        );


      case 'getPickupHistory':
        return jsonResponse(
          getPickupHistory(data.supplierId)
        );


      case 'getPickupHistoryByPhone':
        return jsonResponse(
          getPickupHistoryByPhone(data.phone)
        );


      // ==========================================
      // WEIGHING
      // ==========================================

      case 'createWeighing':
        return jsonResponse(
          createWeighing(data)
        );


      // ==========================================
      // DASHBOARD
      // ==========================================

      case 'getDashboard':
        return jsonResponse(
          getDashboard()
        );


      case 'getRoutes':
        return jsonResponse(
          getRoutes()
        );

      
      // ==========================================
      // PRICING
      // ==========================================

      case 'getPricing':
        return jsonResponse(
          getCurrentPricing()
        );


      // ==========================================
      // UNKNOWN ACTION
      // ==========================================

      default:

        return jsonResponse({
          success: false,
          error:
            'Unknown action: ' + action
        });

    }

  } catch (error) {

    return jsonResponse({
      success: false,
      error: error.message
    });

  }
}


/**
 * =========================
 * SUPPLIER
 * =========================
 */

function createSupplier(data) {

  validateRequired(data, [
    'supplierType',
    'name',
    'phone',
    'area'
  ]);

  const sheet = getSheet(CONFIG.SHEETS.SUPPLIERS);

  const supplierId = generateId('SUP');

  const row = [
    supplierId,
    data.supplierType,
    data.name,
    data.phone,
    data.area,
    data.address || '',
    Number(data.typicalVolumeL) || 0,
    data.collectionPreference || '',
    'Active',
    new Date()
  ];

  sheet.appendRow(row);

  return {
    success: true,
    supplierId: supplierId,
    message: 'Supplier successfully created.'
  };
}


/**
 * =========================
 * PICKUP REQUEST
 * =========================
 */

function createPickupRequest(data) {

validateRequired(data, [
  'supplierId',
  'area',
  'estimatedVolumeL',
  'preferredSchedule'
]);

  const sheet = getSheet(CONFIG.SHEETS.PICKUP_REQUESTS);

  const supplier = findSupplier(data.supplierId);

  if (!supplier) {
    throw new Error('Supplier not found.');
  }

  const requestId = generateId('REQ');

  const routeId = generateRouteId(
    data.area,
    data.preferredSchedule
  );

  const row = [
    requestId,
    data.supplierId,
    supplier.supplierType,
    data.area,
    Number(data.estimatedVolumeL),
    data.preferredSchedule,
    routeId,
    'Pending',
    new Date(),
    data.notes || ''
  ];

  sheet.appendRow(row);

  updateRoute(routeId);

  return {
    success: true,
    requestId: requestId,
    routeId: routeId,
    status: 'Pending',
    message: 'Pickup request successfully submitted.'
  };
}


/**
 * =========================
 * WEIGHING & PAYOUT
 * =========================
 */

function createWeighing(data) {

  validateRequired(data, [

    'requestId',

    'actualVolumeL',

    'pricePerL'

  ]);

  const request =
    findPickupRequest(data.requestId);

  if (!request) {

    throw new Error(
      'Pickup request not found.'
    );

  }

  const sheet =
    getSheet(
      CONFIG.SHEETS.WEIGHING_PAYOUT
    );

  // ==========================================
  // PREVENT DUPLICATE WEIGHING
  // ==========================================

  const existingData =
    sheet.getDataRange().getValues();

  for (let i = 1; i < existingData.length; i++) {

    const existingRequestId =
      String(existingData[i][1]).trim();

    if (
      existingRequestId ===
      String(data.requestId).trim()
    ) {

      throw new Error(
        'Weighing already recorded for this pickup request.'
      );

    }

  }

  // ==========================================
  // CREATE TRANSACTION
  // ==========================================

  const transactionId =
    generateId('TXN');

  const actualVolume =
    Number(data.actualVolumeL);

  const pricePerL =
    Number(data.pricePerL);

  const payout =
    actualVolume * pricePerL;

  const row = [

    transactionId,

    data.requestId,

    request.routeId,

    request.supplierId,

    request.estimatedVolumeL,

    actualVolume,

    pricePerL,

    payout,

    new Date(),

    data.paymentStatus || 'Pending'

  ];

  sheet.appendRow(row);

  updatePickupStatus(

    data.requestId,

    'Completed'

  );

  updateRoute(

    request.routeId

  );

  return {

    success: true,

    transactionId: transactionId,

    actualVolumeL:
      actualVolume,

    payout:
      payout,

    message:
      'Weighing successfully recorded.'

  };

}

function getWeighingQueue() {

  const cache =
    CacheService.getScriptCache();

  const cacheKey =
    'JEMPUT_JELANTAH_WEIGHING_QUEUE';

  try {

    // ==========================================
    // CHECK CACHE
    // ==========================================

    const cached =
      cache.get(cacheKey);

    if (cached) {

      console.log(
        'WEIGHING QUEUE: served from cache'
      );

      return JSON.parse(cached);

    }


    // ==========================================
    // READ PICKUP REQUESTS
    // ==========================================

    const ss =
      SpreadsheetApp.getActiveSpreadsheet();

    const sheet =
      ss.getSheetByName(
        'PICKUP_REQUESTS'
      );


    if (!sheet) {

      return {

        success: false,

        message:
          'Sheet PICKUP_REQUESTS tidak ditemukan.'

      };

    }


    const data =
      sheet.getDataRange().getValues();


    if (data.length < 2) {

      const emptyResult = {

        success: true,

        requests: []

      };


      cache.put(
        cacheKey,
        JSON.stringify(emptyResult),
        30
      );


      return emptyResult;

    }


    // ==========================================
    // HEADER INDEX
    // ==========================================

    const headers =
      data[0];


    const requestIdIndex =
      headers.indexOf(
        'Request ID'
      );

    const supplierIdIndex =
      headers.indexOf(
        'Supplier ID'
      );

    const supplierTypeIndex =
      headers.indexOf(
        'Supplier Type'
      );

    const areaIndex =
      headers.indexOf(
        'Area'
      );

    const estimatedVolumeIndex =
      headers.indexOf(
        'Estimated Volume L'
      );

    const routeIdIndex =
      headers.indexOf(
        'Route ID'
      );

    const statusIndex =
      headers.indexOf(
        'Status'
      );


    if (
      requestIdIndex === -1 ||
      supplierIdIndex === -1 ||
      supplierTypeIndex === -1 ||
      areaIndex === -1 ||
      estimatedVolumeIndex === -1 ||
      routeIdIndex === -1 ||
      statusIndex === -1
    ) {

      return {

        success: false,

        message:
          'Header sheet PICKUP_REQUESTS tidak sesuai.'

      };

    }


    // ==========================================
    // BUILD QUEUE
    // ==========================================

    const requests = [];


    for (
      let i = 1;
      i < data.length;
      i++
    ) {

      const row =
        data[i];


      const status =
        String(
          row[statusIndex] || ''
        )
        .trim()
        .toLowerCase();


      if (
        status === 'completed' ||
        status === 'cancelled'
      ) {

        continue;

      }


      const requestId =
        String(
          row[requestIdIndex] || ''
        ).trim();


      if (!requestId) {

        continue;

      }


      requests.push({

        requestId:
          requestId,

        supplierId:
          String(
            row[supplierIdIndex] || ''
          ),

        supplierType:
          String(
            row[supplierTypeIndex] || ''
          ),

        area:
          String(
            row[areaIndex] || ''
          ),

        estimatedVolumeL:
          Number(
            row[estimatedVolumeIndex]
          ) || 0,

        routeId:
          String(
            row[routeIdIndex] || ''
          ),

        status:
          String(
            row[statusIndex] || ''
          )

      });

    }


    // ==========================================
    // RESULT
    // ==========================================

    const result = {

      success: true,

      requests:
        requests

    };


    // ==========================================
    // SAVE CACHE
    // ==========================================

    cache.put(
      cacheKey,
      JSON.stringify(result),
      30
    );


    console.log(
      'WEIGHING QUEUE: loaded from sheet and cached'
    );


    return result;


  } catch (error) {

    console.error(
      'getWeighingQueue error:',
      error
    );


    return {

      success: false,

      message:
        error.message ||
        'Gagal mengambil antrean weighing.'

    };

  }

}


/**
 * =========================
 * ROUTES
 * =========================
 */

function updateRoute(routeId) {

  const routeSheet =
    getSheet(CONFIG.SHEETS.ROUTES);

  const requestsSheet =
    getSheet(CONFIG.SHEETS.PICKUP_REQUESTS);

  const requestData =
    requestsSheet.getDataRange().getValues();

  const routeRequests = [];

  // ==========================================
  // 1. GET ALL REQUESTS BELONGING TO THIS ROUTE
  // ==========================================

  for (let i = 1; i < requestData.length; i++) {

    const requestRouteId =
      String(requestData[i][6]).trim();

    const status =
      String(requestData[i][7]).trim();

    if (
      requestRouteId === String(routeId).trim() &&
      status !== 'Cancelled'
    ) {

      routeRequests.push({

        requestId: requestData[i][0],

        supplierId: requestData[i][1],

        supplierType: requestData[i][2],

        area: requestData[i][3],

        estimatedVolume:
          Number(requestData[i][4]) || 0,

        preferredSchedule: requestData[i][5],

        status: status

      });
    }
  }


  // ==========================================
  // 2. NO REQUEST FOUND
  // ==========================================

  if (routeRequests.length === 0) {

    console.log(
      'No pickup requests found for route: ' +
      routeId
    );

    return {
      success: false,
      routeId: routeId,
      message: 'No pickup requests found.'
    };
  }


  // ==========================================
  // 3. BASIC ROUTE INFORMATION
  // ==========================================

  const area =
    routeRequests[0].area;

  const schedule =
    routeRequests[0].preferredSchedule;


  // ==========================================
  // 4. COUNT UMKM ANCHORS
  // ==========================================

  const umkmCount =
    routeRequests.filter(item => {

      return String(item.supplierType)
        .trim()
        .toUpperCase() === 'UMKM';

    }).length;


  // ==========================================
  // 5. COUNT HOUSEHOLD CONTRIBUTORS
  // ==========================================

  const householdCount =
    routeRequests.filter(item => {

      const type =
        String(item.supplierType)
          .trim()
          .toUpperCase();

      return (
        type === 'HOUSEHOLD' ||
        type === 'RUMAH TANGGA'
      );

    }).length;


  // ==========================================
  // 6. TOTAL ESTIMATED LITERS
  // ==========================================

  const estimatedLiters =
    routeRequests.reduce(
      (total, item) => {

        return total +
          (Number(item.estimatedVolume) || 0);

      },
      0
    );


  // ==========================================
  // 7. ACTUAL LITERS FROM WEIGHING
  // ==========================================

  const actualLiters =
    Number(getActualLiters(routeId)) || 0;


  // ==========================================
  // 8. TOTAL SUPPLIERS
  // ==========================================

  const supplierCount =
    routeRequests.length;


  // ==========================================
  // 9. CHECK PICKUP PROGRESS
  // ==========================================

  const completedCount =
    routeRequests.filter(item => {

      const status =
        String(item.status)
          .trim()
          .toUpperCase();

      return (
        status === 'PICKED UP' ||
        status === 'COMPLETED'
      );

    }).length;


  const allPickedUp =
    completedCount === routeRequests.length;


  // ==========================================
  // 10. ROUTE STATUS
  // ==========================================

  let routeStatus = 'Open';


  // ALL PICKUPS COMPLETED
  if (
    allPickedUp &&
    actualLiters > 0
  ) {

    routeStatus = 'Completed';

  }


  // SOME PICKUPS COMPLETED
  else if (
    completedCount > 0
  ) {

    routeStatus = 'In Progress';

  }


  // ENOUGH ESTIMATED VOLUME
  else if (
    estimatedLiters >= 50
  ) {

    routeStatus = 'Ready';

  }


  // BELOW THRESHOLD
  else {

    routeStatus = 'Open';

  }


  // ==========================================
  // 11. LITERS PER ROUTE
  // ==========================================

  const litersPerRoute =
    actualLiters > 0
      ? actualLiters
      : estimatedLiters;


  // ==========================================
  // 12. GET ACTIVE PRICING
  // ==========================================

  const pricing =
    getActivePricing();

  const buyerPricePerL =
    Number(
      pricing.referencePricePerL
    ) || 0;


  // ==========================================
  // 13. CALCULATE REVENUE
  // ==========================================

  const revenue =
    actualLiters * buyerPricePerL;


  // ==========================================
  // 14. CALCULATE SUPPLIER PAYOUT
  // ==========================================

  const weighingSheet =
    getSheet(
      CONFIG.SHEETS.WEIGHING_PAYOUT
    );

  const weighingData =
    weighingSheet.getDataRange().getValues();

  let supplierPayout = 0;


  for (let i = 1; i < weighingData.length; i++) {

    const transactionRouteId =
      String(weighingData[i][2]).trim();

    if (
      transactionRouteId ===
      String(routeId).trim()
    ) {

      supplierPayout +=
        Number(weighingData[i][7]) || 0;

    }

  }


  // ==========================================
  // 15. COST & CONTRIBUTION MARGIN
  // ==========================================

  const cost =
    supplierPayout;

  const contributionMargin =
    revenue - cost;


  // ==========================================
  // 16. PREPARE ROUTE ROW
  // ==========================================

  const row = [

    routeId,

    area,

    schedule,

    umkmCount,

    householdCount,

    estimatedLiters,

    actualLiters,

    supplierCount,

    routeStatus,

    revenue,

    cost,

    contributionMargin,

    litersPerRoute

  ];


  // ==========================================
  // 17. UPDATE EXISTING ROUTE
  // OR CREATE NEW ROUTE
  // ==========================================

  const existingRow =
    findRouteRow(routeId);


  if (existingRow) {

    routeSheet
      .getRange(
        existingRow,
        1,
        1,
        row.length
      )
      .setValues([row]);

  }

  else {

    routeSheet.appendRow(row);

  }


  // ==========================================
  // 18. LOG RESULT
  // ==========================================

  console.log(
    'Route updated: ' +
    routeId +
    ' | ' +
    estimatedLiters +
    'L estimated' +
    ' | ' +
    actualLiters +
    'L actual' +
    ' | Revenue: Rp' +
    revenue +
    ' | Cost: Rp' +
    cost +
    ' | Margin: Rp' +
    contributionMargin +
    ' | Status: ' +
    routeStatus
  );


  // ==========================================
  // 19. RETURN RESULT
  // ==========================================

  return {

    success: true,

    routeId: routeId,

    area: area,

    schedule: schedule,

    umkmCount: umkmCount,

    householdCount: householdCount,

    estimatedLiters: estimatedLiters,

    actualLiters: actualLiters,

    suppliers: supplierCount,

    allPickedUp: allPickedUp,

    status: routeStatus,

    litersPerRoute: litersPerRoute,

    buyerPricePerL: buyerPricePerL,

    revenue: revenue,

    cost: cost,

    contributionMargin:
      contributionMargin

  };

}

/**
 * =========================
 * DASHBOARD
 * =========================
 */

function getDashboard() {

  const suppliers =
    getSheet(CONFIG.SHEETS.SUPPLIERS)
      .getDataRange()
      .getValues();

  const requests =
    getSheet(CONFIG.SHEETS.PICKUP_REQUESTS)
      .getDataRange()
      .getValues();

  const transactions =
    getSheet(CONFIG.SHEETS.WEIGHING_PAYOUT)
      .getDataRange()
      .getValues();

  const routes =
    getSheet(CONFIG.SHEETS.ROUTES)
      .getDataRange()
      .getValues();


  const supplierRows =
    suppliers.slice(1);

  const requestRows =
    requests.slice(1);

  const transactionRows =
    transactions.slice(1);

  const routeRows =
    routes.slice(1);


  /*
   * =========================
   * SUPPLIER METRICS
   * =========================
   */

  const totalSuppliers =
    supplierRows.length;

  const activeUmkm =
    supplierRows.filter(
      row =>
        String(row[1]).toUpperCase() === 'UMKM' &&
        String(row[8]).toUpperCase() === 'ACTIVE'
    ).length;

  const households =
    supplierRows.filter(
      row =>
        (
          String(row[1]).toUpperCase() === 'HOUSEHOLD' ||
          String(row[1]).toUpperCase() === 'RUMAH TANGGA'
        ) &&
        String(row[8]).toUpperCase() === 'ACTIVE'
    ).length;


  /*
   * =========================
   * PICKUP METRICS
   * =========================
   */

  const pickupRequests =
    requestRows.length;

  const completedPickups =
    requestRows.filter(
      row =>
        String(row[7]).toUpperCase() === 'COMPLETED'
    ).length;


  /*
   * =========================
   * VOLUME METRICS
   * =========================
   */

  const estimatedLiters =
    requestRows.reduce(
      (sum, row) =>
        sum + (Number(row[4]) || 0),
      0
    );

  const actualLiters =
    transactionRows.reduce(
      (sum, row) =>
        sum + (Number(row[5]) || 0),
      0
    );


  /*
   * =========================
   * ROUTE METRICS
   * =========================
   */

  const completedRoutes =
    routeRows.filter(
      row =>
        String(row[8]).toUpperCase() === 'COMPLETED'
    );


  const averageLitersPerRoute =
    completedRoutes.length > 0
      ? completedRoutes.reduce(
          (sum, row) =>
            sum + (Number(row[12]) || 0),
          0
        ) / completedRoutes.length
      : 0;


  /*
   * =========================
   * ROUTE THRESHOLD
   * =========================
   */

  const routesAtThreshold =
    routeRows.filter(
      row =>
        (Number(row[12]) || 0) >= 50
    ).length;


  const totalRoutes =
    routeRows.length;


  const routeThresholdRate =
    totalRoutes > 0
      ? routesAtThreshold / totalRoutes
      : 0;


  /*
   * =========================
   * COMPLETION RATE
   * =========================
   */

  const completionRate =
    pickupRequests > 0
      ? completedPickups / pickupRequests
      : 0;


  /*
   * =========================
   * REPEAT CONTRIBUTION
   * =========================
   */

  const supplierRequestCount = {};

  requestRows.forEach(row => {

    const supplierId =
      String(row[1] || '');

    if (!supplierId) {
      return;
    }

    supplierRequestCount[supplierId] =
      (supplierRequestCount[supplierId] || 0) + 1;

  });


  const repeatSuppliers =
    Object.values(supplierRequestCount)
      .filter(count => count > 1)
      .length;


  const repeatContributionRate =
    totalSuppliers > 0
      ? repeatSuppliers / totalSuppliers
      : 0;


  /*
   * =========================
   * PAYOUT METRICS
   * =========================
   */

  const totalPayout =
    transactionRows.reduce(
      (sum, row) =>
        sum + (Number(row[7]) || 0),
      0
    );


  const averagePayoutPerLiter =
    actualLiters > 0
      ? totalPayout / actualLiters
      : 0;


  /*
   * =========================
   * REVENUE
   * =========================
   *
   * Revenue is taken directly
   * from ROUTES.
   *
   * ROUTES column J = Revenue
   */

  const totalRevenue =
    routeRows.reduce(
      (sum, row) =>
        sum + (Number(row[9]) || 0),
      0
    );


  /*
   * =========================
   * CONTRIBUTION MARGIN
   * =========================
   *
   * ROUTES column L = Margin
   */

  const contributionMargin =
    routeRows.reduce(
      (sum, row) =>
        sum + (Number(row[11]) || 0),
      0
    );


  /*
   * =========================
   * MARGIN PER LITER
   * =========================
   */

  const contributionMarginPerLiter =
    actualLiters > 0
      ? contributionMargin / actualLiters
      : 0;


  /*
   * =========================
   * MARGIN RATE
   * =========================
   */

  const contributionMarginRate =
    totalRevenue > 0
      ? contributionMargin / totalRevenue
      : 0;


  /*
   * =========================
   * WRITE TO DASHBOARD
   * =========================
   */

  const dashboardSheet =
    getSheet(CONFIG.SHEETS.DASHBOARD);


  dashboardSheet
    .getRange(
      1,
      1,
      dashboardSheet.getMaxRows(),
      4
    )
    .clearContent();


  dashboardSheet
    .getRange(1, 1, 1, 4)
    .setValues([
      [
        'Metric',
        'Value',
        'Target',
        'Status'
      ]
    ]);


  const dashboardRows = [

    [
      'Total Suppliers',
      totalSuppliers,
      '',
      totalSuppliers > 0
        ? 'Active'
        : 'No Data'
    ],

    [
      'Active UMKM Anchors',
      activeUmkm,
      '',
      activeUmkm > 0
        ? 'Active'
        : 'No Data'
    ],

    [
      'Household Contributors',
      households,
      '',
      households > 0
        ? 'Active'
        : 'No Data'
    ],

    [
      'Pickup Requests',
      pickupRequests,
      '',
      pickupRequests > 0
        ? 'Active'
        : 'No Data'
    ],

    [
      'Completed Pickups',
      completedPickups,
      '',
      completedPickups > 0
        ? 'Validated'
        : 'No Data'
    ],

    [
      'Estimated Liters',
      estimatedLiters,
      '',
      estimatedLiters > 0
        ? 'Active'
        : 'No Data'
    ],

    [
      'Actual Liters',
      actualLiters,
      '',
      actualLiters > 0
        ? 'Validated'
        : 'No Data'
    ],

    [
      'Average Liters Per Route',
      Number(
        averageLitersPerRoute.toFixed(2)
      ),
      50,
      averageLitersPerRoute >= 50
        ? 'Target Met'
        : 'Below Target'
    ],

    [
      'Routes ≥ 50 L',
      routesAtThreshold,
      '',
      routesAtThreshold > 0
        ? 'Validated'
        : 'No Data'
    ],

    [
      'Route Threshold Achievement',
      Number(
        (routeThresholdRate * 100).toFixed(2)
      ) + '%',
      '100%',
      routeThresholdRate >= 1
        ? 'Target Met'
        : 'Below Target'
    ],

    [
      'Pickup Completion Rate',
      Number(
        (completionRate * 100).toFixed(2)
      ) + '%',
      '≥ 80%',
      completionRate >= 0.8
        ? 'Target Met'
        : 'Below Target'
    ],

    [
      'Repeat Contribution Rate',
      Number(
        (repeatContributionRate * 100).toFixed(2)
      ) + '%',
      '≥ 50%',
      repeatContributionRate >= 0.5
        ? 'Target Met'
        : 'Below Target'
    ],

    [
      'Average Payout Per Liter',
      averagePayoutPerLiter,
      '',
      averagePayoutPerLiter > 0
        ? 'Active'
        : 'No Data'
    ],

    [
      'Total Revenue',
      totalRevenue,
      '',
      totalRevenue > 0
        ? 'Validated'
        : 'No Data'
    ],

    [
      'Total Supplier Payout',
      totalPayout,
      '',
      totalPayout > 0
        ? 'Validated'
        : 'No Data'
    ],

    [
      'Contribution Margin',
      contributionMargin,
      '',
      contributionMargin > 0
        ? 'Positive'
        : 'No Data'
    ],

    [
      'Contribution Margin Per Liter',
      contributionMarginPerLiter,
      '',
      contributionMarginPerLiter > 0
        ? 'Positive'
        : 'No Data'
    ],

    [
      'Contribution Margin Rate',
      Number(
        (contributionMarginRate * 100).toFixed(2)
      ) + '%',
      '',
      contributionMarginRate > 0
        ? 'Positive'
        : 'No Data'
    ]

  ];


  dashboardSheet
    .getRange(
      2,
      1,
      dashboardRows.length,
      4
    )
    .setValues(dashboardRows);


  /*
   * =========================
   * RETURN RESULT
   * =========================
   */

  return {

    success: true,

    metrics: {

      totalSuppliers,

      activeUmkm,

      households,

      pickupRequests,

      completedPickups,

      estimatedLiters,

      actualLiters,

      averageLitersPerRoute,

      routesAtThreshold,

      routeThresholdRate,

      completionRate,

      repeatContributionRate,

      averagePayoutPerLiter,

      totalRevenue,

      totalPayout,

      contributionMargin,

      contributionMarginPerLiter,

      contributionMarginRate

    }

  };

}


/**
 * =========================
 * GET ROUTES
 * =========================
 */

function getRoutes() {

  const sheet =
    getSheet(CONFIG.SHEETS.ROUTES);

  const values =
    sheet.getDataRange().getValues();

  if (values.length <= 1) {
    return {
      success: true,
      routes: []
    };
  }

  const headers = values[0];

  const routes =
    values.slice(1).map(row => {

      let obj = {};

      headers.forEach(
        (header, index) => {
          obj[header] = row[index];
        }
      );

      return obj;
    });

  return {
    success: true,
    routes
  };
}


/**
 * =========================
 * SUPPLIER LOOKUP
 * =========================
 */

function getSupplier(supplierId) {

  const supplier =
    findSupplier(supplierId);

  if (!supplier) {

    return {
      success: false,
      error: 'Supplier not found.'
    };

  }

  return {
    success: true,
    supplier
  };
}


/**
 * =========================
 * HELPER FUNCTIONS
 * =========================
 */

function getSheet(name) {

  const spreadsheet =
    SpreadsheetApp.getActiveSpreadsheet();

  const sheet =
    spreadsheet.getSheetByName(name);

  if (!sheet) {
    throw new Error(
      'Sheet not found: ' + name
    );
  }

  return sheet;
}


function findSupplier(supplierId) {

  const sheet =
    getSheet(CONFIG.SHEETS.SUPPLIERS);

  const data =
    sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {

    if (data[i][0] === supplierId) {

      return {
        supplierId: data[i][0],
        supplierType: data[i][1],
        name: data[i][2],
        phone: data[i][3],
        area: data[i][4],
        address: data[i][5],
        typicalVolumeL: data[i][6],
        collectionPreference: data[i][7],
        status: data[i][8],
        createdAt: data[i][9]
      };

    }
  }

  return null;
}

// ==========================================
// NORMALIZE PHONE NUMBER
// ==========================================

function normalizePhone(phone) {

  let value =
    String(phone || '')
      .trim()
      .replace(/\D/g, '');

  if (!value) {
    return '';
  }

  // +62xxxxxxxxxx / 62xxxxxxxxxx
  if (value.startsWith('62')) {
    value = '0' + value.substring(2);
  }

  // 8xxxxxxxxxx
  else if (value.startsWith('8')) {
    value = '0' + value;
  }

  return value;
}

function displayPhone(phone) {

  const normalized =
    normalizePhone(phone);

  return normalized || '';
}


// ==========================================
// FIND SUPPLIER BY PHONE
// ==========================================

function findSupplierByPhone(phone) {

  const sheet =
    getSheet(CONFIG.SHEETS.SUPPLIERS);

  const data =
    sheet.getDataRange().getValues();

  if (data.length <= 1) {
    return null;
  }

  const normalizedPhone =
    normalizePhone(phone);

  for (let i = 1; i < data.length; i++) {

    const rowPhone =
      normalizePhone(data[i][3]);

    if (
      rowPhone &&
      rowPhone === normalizedPhone
    ) {

      return {

        supplierId: String(data[i][0] || ''),

        supplierType: String(data[i][1] || ''),

        name: String(data[i][2] || ''),

        phone: displayPhone(data[i][3]),

        area: String(data[i][4] || ''),

        address: String(data[i][5] || ''),

        typicalVolumeL:
          Number(data[i][6]) || 0,

        collectionPreference:
          String(data[i][7] || ''),

        status:
          String(data[i][8] || ''),

        createdAt:
          data[i][9]
            ? new Date(data[i][9]).toISOString()
            : ''

      };

    }

  }

  return null;
}

// ==========================================
// GET SUPPLIER BY PHONE
// ==========================================

function getSupplierByPhone(phone) {

  if (!phone) {

    return {
      success: false,
      message: 'Phone number is required.'
    };

  }

  const supplier =
    findSupplierByPhone(phone);

  if (!supplier) {

    return {
      success: true,
      found: false,
      supplier: null
    };

  }

  return {
    success: true,
    found: true,
    supplier: supplier
  };

}

// ==========================================
// GET PICKUP HISTORY BY PHONE
// ==========================================

function getPickupHistoryByPhone(phone) {

  const supplier =
    findSupplierByPhone(phone);

  if (!supplier) {

    return {
      success: true,
      found: false,
      supplier: null,
      history: []
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
    history: history || []
  };

}


// ==========================================
// GET COLLECTION PROGRESS BY PHONE
// ==========================================

function getCollectionProgressByPhone(phone) {

  const supplier =
    findSupplierByPhone(phone);

  if (!supplier) {
    return {
      success: true,
      found: false,
      collectedLiters: 0,
      targetLiters: 10,
      remainingLiters: 10,
      progressPercent: 0
    };
  }

  const sheet =
    getSheet(CONFIG.SHEETS.PICKUP_REQUESTS);

  const data =
    sheet.getDataRange().getValues();

  let collectedLiters = 0;

  for (let i = 1; i < data.length; i++) {

    const supplierId =
      String(data[i][1]).trim();

    const status =
      String(data[i][7])
        .trim()
        .toUpperCase();

    if (
      supplierId ===
      String(supplier.supplierId).trim()
    ) {

      if (
        status !== 'COMPLETED' &&
        status !== 'CANCELLED'
      ) {

        collectedLiters +=
          Number(data[i][4]) || 0;

      }
    }
  }

  const targetLiters = 10;

  const remainingLiters =
    Math.max(
      targetLiters - collectedLiters,
      0
    );

  const progressPercent =
    Math.min(
      Math.round(
        (collectedLiters / targetLiters) * 100
      ),
      100
    );

  return {
    success: true,
    found: true,
    collectedLiters: collectedLiters,
    targetLiters: targetLiters,
    remainingLiters: remainingLiters,
    progressPercent: progressPercent
  };
}

// ==========================================
// GET PICKUP HISTORY BY PHONE
// ==========================================

function getPickupHistory(supplierId) {

  const sheet =
    getSheet(CONFIG.SHEETS.PICKUP_REQUESTS);

  const data =
    sheet.getDataRange().getValues();

  if (data.length <= 1) {
    return [];
  }

  const history = [];

  for (let i = 1; i < data.length; i++) {

    if (
      String(data[i][1]) ===
      String(supplierId)
    ) {

      history.push({

        requestId:
          String(data[i][0] || ''),

        supplierId:
          String(data[i][1] || ''),

        supplierType:
          String(data[i][2] || ''),

        area:
          String(data[i][3] || ''),

        estimatedVolumeL:
          Number(data[i][4]) || 0,

        preferredSchedule:
          String(data[i][5] || ''),

        routeId:
          String(data[i][6] || ''),

        status:
          String(data[i][7] || ''),

        submittedAt:
          data[i][8]
            ? new Date(data[i][8]).toISOString()
            : '',

        notes:
          String(data[i][9] || '')

      });

    }

  }

  history.reverse();

  return history;

}

// ==========================================
// CREATE OR GET SUPPLIER
// ==========================================

function createOrGetSupplier(data) {

  validateRequired(data, [
    'supplierType',
    'name',
    'phone',
    'area'
  ]);

  // ========================================
  // CHECK EXISTING SUPPLIER
  // ========================================

  const existingSupplier =
    findSupplierByPhone(data.phone);

  if (existingSupplier) {

    return {
      success: true,
      isNew: false,
      supplierId: existingSupplier.supplierId,
      supplier: existingSupplier
    };

  }


  // ========================================
  // CREATE NEW SUPPLIER
  // ========================================

  const sheet =
    getSheet(CONFIG.SHEETS.SUPPLIERS);

  const supplierId =
    generateId('SUP');

  sheet.appendRow([
    supplierId,
    data.supplierType,
    data.name,
    data.phone,
    data.area,
    data.address || '',
    Number(data.typicalVolumeL) || 0,
    data.collectionPreference || '',
    'Active',
    new Date()
  ]);

  return {
    success: true,
    isNew: true,
    supplierId: supplierId,
    supplier: {
      supplierId: supplierId,
      supplierType: data.supplierType,
      name: data.name,
      phone: data.phone,
      area: data.area
    }
  };

}

function findPickupRequest(requestId) {

  const sheet =
    getSheet(CONFIG.SHEETS.PICKUP_REQUESTS);

  const data =
    sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {

    if (data[i][0] === requestId) {

      return {
        requestId: data[i][0],
        supplierId: data[i][1],
        supplierType: data[i][2],
        area: data[i][3],
        estimatedVolumeL: Number(data[i][4]),
        preferredSchedule: data[i][5],
        routeId: data[i][6],
        status: data[i][7]
      };

    }
  }

  return null;
}


function updatePickupStatus(
  requestId,
  newStatus
) {

  const sheet =
    getSheet(CONFIG.SHEETS.PICKUP_REQUESTS);

  const data =
    sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {

    if (data[i][0] === requestId) {

      sheet
        .getRange(i + 1, 8)
        .setValue(newStatus);

      return;

    }
  }
}


function findRouteRow(routeId) {

  const sheet =
    getSheet(CONFIG.SHEETS.ROUTES);

  const data =
    sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {

    if (data[i][0] === routeId) {
      return i + 1;
    }

  }

  return null;
}


function getActualLiters(routeId) {

  const sheet =
    getSheet(CONFIG.SHEETS.WEIGHING_PAYOUT);

  const data =
    sheet.getDataRange().getValues();

  let total = 0;

  for (let i = 1; i < data.length; i++) {

    if (data[i][2] === routeId) {

      total += Number(data[i][5]) || 0;

    }
  }

  return total;
}


function generateId(prefix) {

  const timestamp =
    new Date().getTime();

  const random =
    Math.floor(Math.random() * 1000);

  return prefix + '-' + timestamp + '-' + random;
}


function generateRouteId(
  area,
  schedule
) {

  const cleanArea =
    String(area)
      .trim()
      .toUpperCase()
      .replace(/\s+/g, '');

  const cleanSchedule =
    String(schedule)
      .trim()
      .toUpperCase()
      .replace(/\s+/g, '-');

  return 'RT-' +
    cleanArea +
    '-' +
    cleanSchedule;
}


function validateRequired(
  data,
  fields
) {

  fields.forEach(field => {

    if (
      data[field] === undefined ||
      data[field] === null ||
      data[field] === ''
    ) {

      throw new Error(
        'Missing required field: ' + field
      );

    }

  });
}
function jsonResponse(data) {

  return ContentService
    .createTextOutput(
      JSON.stringify(data)
    )
    .setMimeType(
      ContentService.MimeType.JSON
    );
}

function testCreateWeighing() {

  const data = {
    requestId: 'REQ-1789222076467-901',
    actualVolumeL: 23,
    pricePerL: 5500
  };

  Logger.log('DATA:');
  Logger.log(JSON.stringify(data));

  const result = createWeighing(data);

  Logger.log('RESULT:');
  Logger.log(JSON.stringify(result));
}

function testValidateRequired() {

  const testData = {
    requestId: 'REQ-1789222249386-115',
    actualVolumeL: 23,
    pricePerL: 5500
  };

  const testFields = [
    'requestId',
    'actualVolumeL',
    'pricePerL'
  ];

  validateRequired(testData, testFields);

  Logger.log('validateRequired PASS');
}

function getActivePricing() {

  const sheet =
    getSheet(CONFIG.SHEETS.PRICING);

  const data =
    sheet.getDataRange().getValues();

  if (data.length <= 1) {
    throw new Error(
      'No pricing data found.'
    );
  }

  for (let i = data.length - 1; i >= 1; i--) {

    const status =
      String(data[i][4])
        .trim()
        .toUpperCase();

    if (status === 'ACTIVE') {

      return {

        effectiveDate: data[i][0],

        referencePricePerL:
          Number(data[i][1]) || 0,

        supplierPayoutPerL:
          Number(data[i][2]) || 0,

        source:
          String(data[i][3] || ''),

        status:
          String(data[i][4] || '')

      };

    }

  }

  throw new Error(
    'No active pricing found.'
  );
}

/**
 * =========================
 * CURRENT UCO PRICE
 * =========================
 *
 * Returns the latest active
 * UCO reference price and
 * supplier payout information.
 *
 * PRICING sheet is the
 * current source of truth.
 */

function getCurrentPricing() {

  const cache =
    CacheService.getScriptCache();

  const cacheKey =
    'JEMPUT_JELANTAH_PRICING';

  try {

    // ==========================================
    // CHECK CACHE
    // ==========================================

    const cached =
      cache.get(cacheKey);

    if (cached) {

      console.log(
        'PRICING: served from cache'
      );

      return JSON.parse(cached);

    }


    // ==========================================
    // READ PRICING SHEET
    // ==========================================

    const ss =
      SpreadsheetApp.getActiveSpreadsheet();

    const sheet =
      ss.getSheetByName(
        'PRICING'
      );


    if (!sheet) {

      return {

        success: false,

        message:
          'Sheet PRICING tidak ditemukan.'

      };

    }


    const data =
      sheet.getDataRange().getValues();


    if (data.length < 2) {

      return {

        success: false,

        message:
          'Data PRICING belum tersedia.'

      };

    }


    // ==========================================
    // HEADER INDEX
    // ==========================================

    const headers =
      data[0];


    const effectiveDateIndex =
      headers.indexOf(
        'Effective Date'
      );

    const referencePriceIndex =
      headers.indexOf(
        'Reference Price/L'
      );

    const supplierPayoutIndex =
      headers.indexOf(
        'Supplier Payout/L'
      );

    const sourceIndex =
      headers.indexOf(
        'Source'
      );

    const statusIndex =
      headers.indexOf(
        'Status'
      );


    if (
      effectiveDateIndex === -1 ||
      referencePriceIndex === -1 ||
      supplierPayoutIndex === -1 ||
      sourceIndex === -1 ||
      statusIndex === -1
    ) {

      return {

        success: false,

        message:
          'Header sheet PRICING tidak sesuai.'

      };

    }


    // ==========================================
    // FIND ACTIVE PRICE
    // ==========================================

    let activeRow = null;


    for (
      let i = 1;
      i < data.length;
      i++
    ) {

      const row =
        data[i];


      const status =
        String(
          row[statusIndex] || ''
        )
        .trim()
        .toLowerCase();


      if (
        status === 'active'
      ) {

        activeRow =
          row;

      }

    }


    if (!activeRow) {

      return {

        success: false,

        message:
          'Tidak ada harga dengan status Active.'

      };

    }


    // ==========================================
    // BUILD RESULT
    // ==========================================

    const effectiveDate =
      activeRow[
        effectiveDateIndex
      ];


    const result = {

      success: true,

      referencePricePerL:
        Number(
          activeRow[
            referencePriceIndex
          ]
        ) || 0,

      supplierPayoutPerL:
        Number(
          activeRow[
            supplierPayoutIndex
          ]
        ) || 0,

      source:
        String(
          activeRow[
            sourceIndex
          ] || ''
        ),

      effectiveDate:
        effectiveDate instanceof Date
          ? Utilities.formatDate(
              effectiveDate,
              Session.getScriptTimeZone(),
              'dd MMM yyyy HH:mm'
            )
          : String(
              effectiveDate || ''
            )

    };


    // ==========================================
    // CACHE 60 SECONDS
    // ==========================================

    cache.put(
      cacheKey,
      JSON.stringify(result),
      60
    );


    console.log(
      'PRICING: loaded from sheet and cached'
    );


    return result;


  } catch (error) {

    console.error(
      'getCurrentPricing error:',
      error
    );


    return {

      success: false,

      message:
        error.message ||
        'Gagal mengambil harga beli Jemput Jelantah.'

    };

  }

}

function getHomeData(phone) {

  try {

    // ==========================================
    // PRICING
    // ==========================================

    const pricing =
      getCurrentPricing();


    // ==========================================
    // PROGRESS
    // ==========================================

    let progress = {

      success: true,

      collectedLiters: 0,

      targetLiters: 10,

      remainingLiters: 10,

      progressPercent: 0

    };


    if (
      phone &&
      String(phone).trim()
    ) {

      const progressResult =
        getCollectionProgressByPhone(
          phone
        );


      if (
        progressResult &&
        progressResult.success
      ) {

        progress =
          progressResult;

      }

    }


    // ==========================================
    // RETURN HOME DATA
    // ==========================================

    return {

      success: true,

      pricing:
        pricing,

      progress:
        progress

    };


  } catch (error) {

    console.error(
      'getHomeData error:',
      error
    );


    return {

      success: false,

      message:
        error.message ||
        'Gagal mengambil data Home.'

    };

  }

}

function testActivePricing() {

  const pricing =
    getActivePricing();

  Logger.log(
    JSON.stringify(pricing)
  );

}

function testPricingSheet() {

  const sheet =
    getSheet(CONFIG.SHEETS.PRICING);

  const data =
    sheet.getDataRange().getValues();

  Logger.log(
    JSON.stringify(data)
  );

}

function recalculateAllRoutes() {

  const routeSheet =
    getSheet(CONFIG.SHEETS.ROUTES);

  const data =
    routeSheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {

    const routeId =
      String(data[i][0]).trim();

    if (routeId) {
      updateRoute(routeId);
    }

  }

  console.log(
    'All routes recalculated.'
  );

}

function testCreateWeighing() {

  const requestId =
    'REQ-1789226140274-45';

  const pricing =
    getActivePricing();

  const result =
    createWeighing({

      requestId: requestId,

      actualVolumeL: 8.5,

      pricePerL:
        pricing.supplierPayoutPerL,

      paymentStatus: 'Paid'

    });

  console.log(result);

}

function auditDuplicateWeighings() {

  const sheet =
    getSheet(CONFIG.SHEETS.WEIGHING_PAYOUT);

  const data =
    sheet.getDataRange().getValues();

  const seen = {};
  const duplicates = [];

  for (let i = 1; i < data.length; i++) {

    const requestId =
      String(data[i][1]).trim();

    if (!requestId) {
      continue;
    }

    if (seen[requestId]) {

      duplicates.push({

        requestId: requestId,

        firstRow: seen[requestId],

        duplicateRow: i + 1,

        transactionId:
          data[i][0],

        actualVolumeL:
          data[i][5],

        payout:
          data[i][7]

      });

    } else {

      seen[requestId] = i + 1;

    }

  }

  console.log(
    JSON.stringify(
      duplicates,
      null,
      2
    )
  );

  return duplicates;

}

function removeDuplicateWeighing() {

  const sheet =
    getSheet(CONFIG.SHEETS.WEIGHING_PAYOUT);

  const rowToDelete = 4;

  sheet.deleteRow(rowToDelete);

  console.log(
    'Duplicate weighing removed from row ' +
    rowToDelete
  );

}

function testCollectionProgress() {

  const result =
    getCollectionProgressByPhone('819191');

  Logger.log(result);

  return result;
}

function getEstimatedPayout(volumeL) {

  const pricing =
    getActivePricing();

  const volume =
    Number(volumeL) || 0;

  const referencePricePerL =
    Number(
      pricing.referencePricePerL
    ) || 0;

  const supplierPayoutPerL =
    Number(
      pricing.supplierPayoutPerL
    ) || 0;

  const estimatedPayout =
    volume * supplierPayoutPerL;

  return {

    success: true,

    volumeL:
      volume,

    referencePricePerL:
      referencePricePerL,

    supplierPayoutPerL:
      supplierPayoutPerL,

    estimatedPayout:
      estimatedPayout,

    source:
      pricing.source || '',

    effectiveDate:
      pricing.effectiveDate || '',

    status:
      pricing.status || 'Active',

    note:
      'Estimasi payout menggunakan harga payout supplier, bukan harga referensi pasar.'

  };

}

function testEstimatedPayout() {

  const result =
    getEstimatedPayout(8);

  Logger.log(result);

  return result;
}
