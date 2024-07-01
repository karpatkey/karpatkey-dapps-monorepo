import { BigQuery } from '@google-cloud/bigquery'
import { GOOGLE_CREDS, GOOGLE_PROJECT_ID } from '../../config/constants'
import { DATA_WAREHOUSE_ENV } from '../../config/constants'

type DataWarehouseEnvironment = 'production' | 'development'

const REPORTS_DATASET = {
  development: {
    getTreasuryFinancialMetrics: 'reports.vw_treasury_financial_metrics',
    getTokens: 'reports.lk_tokens',
    getTreasuryVariationMetricsDetail: 'reports.vw_dev_token_detail', //'reports.mvw_treasury_variation_metrics_detail',  'vw_dev_token_detail'
    getTreasuryFinancialPositions: 'reports.vw_treasury_financial_positions',
    getTreasuryHistoricVariation: 'reports.dm_treasury_historic_variation',
    getTreasuryHistoricVariationETH: 'reports.dm_treasury_historic_variation_eth',
    getFinancialMetricAndVarDetail: 'reports.vw_financial_metric_and_var_detail',
    getOurDAOTreasury: 'reports_production.vw_prod_our_dao_tr',
    getTreasuryFinancialMetricsWaterfall: 'reports.vw_treasury_financial_metrics_waterfall',
    getTreasuryFinancialMetricsWaterfallETH: 'reports.vw_treasury_financial_metrics_waterfall_eth',
    getWaterfall1Report: 'reports.vw_waterfall1_report',
    getWaterfall1ReportETH: 'reports.vw_waterfall1_report_eth',
    getTotalFundsByTokenCategory: 'reports.vw_total_funds_by_token_category',
    getTreasuryVariationMetricsDetailV2:
      'reports.dm_treasury_variation_metrics_detail_report_tokens',
    getTokenDetail: 'reports.vw_dev_token_detail'
  },
  production: {
    getTreasuryFinancialMetrics: 'reports_production.prod_treasury_financial_metrics', // OK
    getTokens: 'reports_production.prod_tokens', // OK
    getTreasuryVariationMetricsDetail: 'reports_production.vw_prod_token_detail', // vw_prod_token_detail
    getTreasuryFinancialPositions: 'reports_production.prod_treasury_financial_positions', // OK
    getTreasuryHistoricVariation: 'reports_production.prod_treasury_historic_variation', // OK
    getTreasuryHistoricVariationETH: 'reports_production.prod_treasury_historic_variation_eth',
    getFinancialMetricAndVarDetail: 'reports_production.vw_financial_metric_and_var_detail', // OK mvw_treasury_variation_metrics_detail
    getOurDAOTreasury: 'reports_production.vw_prod_our_dao_tr', // OK
    getTreasuryFinancialMetricsWaterfall:
      'reports_production.vw_treasury_financial_metrics_waterfall', // OK
    getTreasuryFinancialMetricsWaterfallETH:
      'reports_production.vw_treasury_financial_metrics_waterfall_eth',
    getWaterfall1Report: 'reports_production.vw_waterfall1_report', // OK
    getWaterfall1ReportETH: 'reports_production.vw_waterfall1_report_eth',
    getTotalFundsByTokenCategory: 'reports_production.vw_total_funds_by_token_category',
    getTreasuryVariationMetricsDetailV2:
      'reports_production.prod_treasury_variation_metrics_detail',
    getTokenDetail: 'reports.vw_dev_token_detail'
  }
}

export class DataWarehouse {
  private static instance: DataWarehouse
  private bigQuery: BigQuery

  private constructor() {
    this.bigQuery = new BigQuery({
      projectId: GOOGLE_PROJECT_ID,
      credentials: GOOGLE_CREDS
    })
  }

  public static getInstance(): DataWarehouse {
    if (!DataWarehouse.instance) {
      DataWarehouse.instance = new DataWarehouse()
    }

    return DataWarehouse.instance
  }

  // DONE
  async getTotalFundsByTokenCategory(
    DAO: Maybe<string>,
    metricPeriod: Maybe<string>,
    metricPeriodType: Maybe<string>
  ) {
    const table =
      REPORTS_DATASET[DATA_WAREHOUSE_ENV as unknown as DataWarehouseEnvironment][
        'getTotalFundsByTokenCategory'
      ]
    let viewQuery = `SELECT * FROM  \`karpatkey-data-warehouse.${table}\``

    if (DAO && metricPeriod && metricPeriodType) {
      viewQuery = viewQuery.concat(
        ` WHERE dao = '${DAO}' AND date_type = '${metricPeriodType}' AND year_month = '${metricPeriod}'`
      )
    }

    return this.executeCommonJobQuery(viewQuery)
  }

  async getTreasuryVariationMetricsDetailV2(
    DAO: Maybe<string>,
    metricPeriod: Maybe<string>,
    metricPeriodType: Maybe<string>
  ) {
    const table =
      REPORTS_DATASET[DATA_WAREHOUSE_ENV as unknown as DataWarehouseEnvironment][
        'getTreasuryVariationMetricsDetailV2'
      ]
    let viewQuery = `SELECT * FROM  \`karpatkey-data-warehouse.${table}\``

    if (DAO && metricPeriod && metricPeriodType) {
      viewQuery = viewQuery.concat(
        ` WHERE dao = '${DAO}' AND date_type = '${metricPeriodType}' AND year_month = '${metricPeriod}'`
      )
    }

    return this.executeCommonJobQuery(viewQuery)
  }

  // DONE
  async getWaterfall1Report(DAO: Maybe<string>, metricPeriod: Maybe<string>) {
    const table =
      REPORTS_DATASET[DATA_WAREHOUSE_ENV as unknown as DataWarehouseEnvironment][
        'getWaterfall1Report'
      ]
    let viewQuery = `SELECT * FROM  \`karpatkey-data-warehouse.${table}\``

    if (DAO && metricPeriod) {
      viewQuery = viewQuery.concat(` WHERE dao = '${DAO}' AND year_month = '${metricPeriod}'`)
    }

    return this.executeCommonJobQuery(viewQuery)
  }

  async getWaterfall1ReportETH(DAO: Maybe<string>, metricPeriod: Maybe<string>) {
    const table =
      REPORTS_DATASET[DATA_WAREHOUSE_ENV as unknown as DataWarehouseEnvironment][
        'getWaterfall1ReportETH'
      ]
    let viewQuery = `SELECT * FROM  \`karpatkey-data-warehouse.${table}\``

    if (DAO && metricPeriod) {
      viewQuery = viewQuery.concat(` WHERE dao = '${DAO}' AND year_month = '${metricPeriod}'`)
    }

    return this.executeCommonJobQuery(viewQuery)
  }

  // DONE
  async getTreasuryFinancialMetricsWaterfall(
    DAO: Maybe<string>,
    metricPeriod: Maybe<string>,
    metricPeriodType: Maybe<string>
  ) {
    const table =
      REPORTS_DATASET[DATA_WAREHOUSE_ENV as unknown as DataWarehouseEnvironment][
        'getTreasuryFinancialMetricsWaterfall'
      ]
    let viewQuery = `SELECT * FROM  \`karpatkey-data-warehouse.${table}\``

    if (DAO && metricPeriod && metricPeriodType) {
      viewQuery = viewQuery.concat(
        ` WHERE dao = '${DAO}' AND date_type = '${metricPeriodType}' AND year_month = '${metricPeriod}'`
      )
    }

    return this.executeCommonJobQuery(viewQuery)
  }

  async getTreasuryFinancialMetricsWaterfallETH(
    DAO: Maybe<string>,
    metricPeriod: Maybe<string>,
    metricPeriodType: Maybe<string>
  ) {
    const table =
      REPORTS_DATASET[DATA_WAREHOUSE_ENV as unknown as DataWarehouseEnvironment][
        'getTreasuryFinancialMetricsWaterfallETH'
      ]
    let viewQuery = `SELECT * FROM  \`karpatkey-data-warehouse.${table}\``

    if (DAO && metricPeriod && metricPeriodType) {
      viewQuery = viewQuery.concat(
        ` WHERE dao = '${DAO}' AND date_type = '${metricPeriodType}' AND year_month = '${metricPeriod}'`
      )
    }

    return this.executeCommonJobQuery(viewQuery)
  }

  // DONE
  async getTreasuryFinancialMetrics(
    DAO: Maybe<string>,
    metricPeriod: Maybe<string>,
    metricPeriodType: Maybe<string>
  ) {
    const table =
      REPORTS_DATASET[DATA_WAREHOUSE_ENV as unknown as DataWarehouseEnvironment][
        'getTreasuryFinancialMetrics'
      ]
    let viewQuery = `SELECT * FROM  \`karpatkey-data-warehouse.${table}\``

    if (DAO && metricPeriod && metricPeriodType) {
      viewQuery = viewQuery.concat(
        ` WHERE dao = '${DAO}' AND date_type = '${metricPeriodType}' AND year_month = '${metricPeriod}'`
      )
    }

    return this.executeCommonJobQuery(viewQuery)
  }

  // DONE
  async getTokens() {
    const table =
      REPORTS_DATASET[DATA_WAREHOUSE_ENV as unknown as DataWarehouseEnvironment]['getTokens']
    const viewQuery = `SELECT * FROM  \`karpatkey-data-warehouse.${table}\``

    return await this.executeCommonJobQuery(viewQuery)
  }

  // DONE
  async getTreasuryVariationMetricsDetail(
    DAO: Maybe<string>,
    metricPeriod: Maybe<string>,
    metricPeriodType: Maybe<string>
  ) {
    const table =
      REPORTS_DATASET[DATA_WAREHOUSE_ENV as unknown as DataWarehouseEnvironment][
        'getTreasuryVariationMetricsDetail'
      ]
    let viewQuery = `SELECT * FROM  \`karpatkey-data-warehouse.${table}\``

    if (DAO && metricPeriod && metricPeriodType) {
      viewQuery = viewQuery.concat(
        ` WHERE dao = '${DAO}' AND date_type = '${metricPeriodType}' AND year_month = '${metricPeriod}'`
      )
    }

    return await this.executeCommonJobQuery(viewQuery)
  }

  // DONE
  async getTreasuryFinancialPositions(
    DAO: Maybe<string>,
    metricPeriod: Maybe<string>,
    metricPeriodType: Maybe<string>
  ) {
    const table =
      REPORTS_DATASET[DATA_WAREHOUSE_ENV as unknown as DataWarehouseEnvironment][
        'getTreasuryFinancialPositions'
      ]
    let viewQuery = `SELECT * FROM  \`karpatkey-data-warehouse.${table}\``

    if (DAO && metricPeriod && metricPeriodType) {
      viewQuery = viewQuery.concat(
        ` WHERE dao = '${DAO}' AND date_type = '${metricPeriodType}' AND year_month = '${metricPeriod}'`
      )
    }

    return this.executeCommonJobQuery(viewQuery)
  }

  // DONE
  async getTreasuryHistoricVariation(
    DAO: Maybe<string>,
    metricPeriod: Maybe<string>,
    metricPeriodType: Maybe<string>
  ) {
    const table =
      REPORTS_DATASET[DATA_WAREHOUSE_ENV as unknown as DataWarehouseEnvironment][
        'getTreasuryHistoricVariation'
      ]
    let viewQuery = `SELECT * FROM  \`karpatkey-data-warehouse.${table}\``
    if (DAO && metricPeriod && metricPeriodType) {
      viewQuery = viewQuery.concat(` WHERE dao = '${DAO}'  AND year_month = '${metricPeriod}'`)
    }

    return await this.executeCommonJobQuery(viewQuery)
  }

  async getTreasuryHistoricVariationETH(
    DAO: Maybe<string>,
    metricPeriod: Maybe<string>,
    metricPeriodType: Maybe<string>
  ) {
    const table =
      REPORTS_DATASET[DATA_WAREHOUSE_ENV as unknown as DataWarehouseEnvironment][
        'getTreasuryHistoricVariationETH'
      ]
    let viewQuery = `SELECT * FROM  \`karpatkey-data-warehouse.${table}\``
    if (DAO && metricPeriod && metricPeriodType) {
      viewQuery = viewQuery.concat(` WHERE dao = '${DAO}'  AND year_month = '${metricPeriod}'`)
    }

    return await this.executeCommonJobQuery(viewQuery)
  }

  // DONE
  async getFinancialMetricAndVarDetail(
    DAO: Maybe<string>,
    metricPeriod: Maybe<string>,
    metricPeriodType: Maybe<string>
  ) {
    const table =
      REPORTS_DATASET[DATA_WAREHOUSE_ENV as unknown as DataWarehouseEnvironment][
        'getFinancialMetricAndVarDetail'
      ]
    let viewQuery = `SELECT * FROM  \`karpatkey-data-warehouse.${table}\``
    if (DAO && metricPeriod && metricPeriodType) {
      viewQuery = viewQuery.concat(
        ` WHERE dao = '${DAO}' AND date_type = '${metricPeriodType}' AND year_month = '${metricPeriod}'`
      )
    }

    return await this.executeCommonJobQuery(viewQuery)
  }

  async getOurDAOTreasury() {
    const table =
      REPORTS_DATASET[DATA_WAREHOUSE_ENV as unknown as DataWarehouseEnvironment][
        'getOurDAOTreasury'
      ]
    const viewQuery = `SELECT * FROM  \`karpatkey-data-warehouse.${table}\``

    return await this.executeCommonJobQuery(viewQuery)
  }

  async getTokenDetail(
    DAO: Maybe<string>,
    metricPeriod: Maybe<string>,
    metricPeriodType: Maybe<string>
  ) {
    const table =
      REPORTS_DATASET[DATA_WAREHOUSE_ENV as unknown as DataWarehouseEnvironment]['getTokenDetail']
    let viewQuery = `SELECT * FROM  \`karpatkey-data-warehouse.${table}\``

    if (DAO && metricPeriod && metricPeriodType) {
      viewQuery = viewQuery.concat(
        ` WHERE dao = '${DAO}' AND date_type = '${metricPeriodType}' AND year_month = '${metricPeriod}'`
      )
    }

    return await this.executeCommonJobQuery(viewQuery)
  }

  private async executeCommonJobQuery(viewQuery: string) {
    const options = {
      query: viewQuery,
      // Location must match that of the dataset(s) referenced in the query.
      location: 'US'
    }

    // Run the query as a job
    const [job] = await this.bigQuery.createQueryJob(options)
    console.log(`Job ${job.id} started.`)

    // Wait for the query to finish
    const [rows] = await job.getQueryResults()

    // We need to do this because the rows object is not serializable (some weird objects returned by the BigQuery API)
    return JSON.parse(JSON.stringify(rows))
  }
}
