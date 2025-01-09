import closeInactiveHealthMetrics from "./closeInactiveHealthMetrics";
import createImageAction from "./createImageAction";
import createWellnessMarketAction from "./createWellnessMarketAction";
import createWellnessTaskAction from "./createWellnessTaskAction";
import deployWellnessCollectionAction from "./deployWellnessCollectionAction";
import fetchHealthPriceAction from "./fetchHealthPriceAction";
import health from "./health";
import registerHealthDomainAction from "./registerHealthDomainAction";
import requestFundsAction from "./requestFundsAction";
import sendWellnessRewardsAction from "./sendWellnessRewardsAction";
import tradeWellnessTokensAction from "./tradeWellnessTokensAction";
import transferHealthTokensAction from "./transferHealthTokensAction";

export const ACTIONS = {
  CLOSE_INACTIVE_HEALTH_METRICS: closeInactiveHealthMetrics,
  CREATE_IMAGE_ACTION: createImageAction,
  CREATE_WELLNESS_MARKET_ACTION: createWellnessMarketAction,
  CREATE_WELLNESS_TASK_ACTION: createWellnessTaskAction,
  DEPLOY_WELLNESS_COLLECTION_ACTION: deployWellnessCollectionAction,
  FETCH_HEALTH_PRICE_ACTION: fetchHealthPriceAction,
  HEALTH: health,
  REGISTER_HEALTH_DOMAIN_ACTION: registerHealthDomainAction,
  REQUEST_FUNDS_ACTION: requestFundsAction,
  SEND_WELLNESS_REWARDS_ACTION: sendWellnessRewardsAction,
  TRADE_WELLNESS_TOKENS_ACTION: tradeWellnessTokensAction,
  TRANSFER_HEALTH_TOKENS_ACTION: transferHealthTokensAction,
};

export type { Action, ActionExample, Handler } from "../types/action";
