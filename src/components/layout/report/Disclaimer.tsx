import { BoxWrapperColumn } from 'components/wrappers'
import { CustomTypography } from 'components/CustomTypography'
import React from 'react'
import { isYearAndMonthValid } from 'src/utils/params'
import { AnimatePresenceWrapper } from 'components/AnimatePresenceWrapper'

export const Disclaimer = () => {
  const isDDay = isYearAndMonthValid()
  return (
    <AnimatePresenceWrapper>
      <BoxWrapperColumn
        sx={{
          margin: {
            xs: '40px 20px 20px 20px',
            md: '180px 30px 30px 30px'
          },
          alignItems: 'flex-start',
          gap: { xs: 2, md: 4 }
        }}
      >
        <CustomTypography
          variant="body2"
          color="textSecondary"
          align="left"
          width="100%"
          sx={{
            fontStyle: 'italic',
            fontSize: {
              xs: '14px',
              sm: '16px',
              md: '18px'
            },
            lineHeight: {
              xs: '20px',
              sm: '24px',
              md: '28px'
            }
          }}
        >
          Token Balances and Prices are considered at end of month 0 UTC.
        </CustomTypography>
        {isDDay && (
          <BoxWrapperColumn gap={'10px'} sx={{ marginBottom: '20px', marginTop: '20px' }}>
            <CustomTypography
              variant="body2"
              color="textSecondary"
              align="left"
              width="100%"
              sx={{
                fontStyle: 'italic',
                fontSize: {
                  xs: '14px',
                  sm: '16px',
                  md: '18px'
                },
                lineHeight: {
                  xs: '20px',
                  sm: '24px',
                  md: '28px'
                }
              }}
            >
              The following report is provided for informational purposes only, and does not
              constitute financial, investment, legal, regulatory, or tax advice.
            </CustomTypography>
            <CustomTypography
              variant="body2"
              color="textSecondary"
              align="left"
              width="100%"
              sx={{
                fontStyle: 'italic',
                fontSize: {
                  xs: '14px',
                  sm: '16px',
                  md: '18px'
                },
                lineHeight: {
                  xs: '20px',
                  sm: '24px',
                  md: '28px'
                }
              }}
            >
              The accuracy of the data and information contained in the report cannot be guaranteed,
              as they are provided strictly on a best efforts basis. References to assets are made
              for informational purposes, and are not a recommendation, offer to sell, or
              solicitation of an offer to buy any asset. Content, data, or assessments provided in
              this report are subject to change without notice. Furthermore, the financial
              statements presented have not undergone a comprehensive financial statement audit from
              a third-party professional accounting firm. As such, there may exist errors or
              inaccuracies that affect the statements.
            </CustomTypography>
            <CustomTypography
              variant="body2"
              color="textSecondary"
              align="left"
              width="100%"
              sx={{
                fontStyle: 'italic',
                fontSize: {
                  xs: '14px',
                  sm: '16px',
                  md: '18px'
                },
                lineHeight: {
                  xs: '20px',
                  sm: '24px',
                  md: '28px'
                }
              }}
            >
              This report may include certain forward looking statements; such statements face a
              high degree of uncertainty and are not a guarantee or promise of future performance or
              events. Author(s) are materially relying on waiver of liability as a condition of
              providing this report. By accessing the content herein, readers agree to indemnify and
              hold harmless author(s) and karpatkey DAO against any and all claims.
            </CustomTypography>
            <CustomTypography
              variant="body2"
              color="textSecondary"
              align="left"
              width="100%"
              sx={{
                fontStyle: 'italic',
                fontSize: {
                  xs: '14px',
                  sm: '16px',
                  md: '18px'
                },
                lineHeight: {
                  xs: '20px',
                  sm: '24px',
                  md: '28px'
                }
              }}
            >
              ACCORDINGLY, WE RECOMMEND THAT YOU DO NOT RELY ON NOR MAKE ANY FINANCIAL OR INVESTMENT
              DECISION BASED ON THE STATEMENTS AND INFORMATION CONTAINED IN THIS REPORT.
            </CustomTypography>
          </BoxWrapperColumn>
        )}
      </BoxWrapperColumn>
    </AnimatePresenceWrapper>
  )
}
