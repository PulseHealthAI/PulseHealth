import deployHealthTokenAction from "./deployHealthToken";
import balanceHealthMetricsAction from "./balanceHealthMetrics";
import transferHealthDataAction from "./transferHealthData";
import deployWellnessCollectionAction from "./deployWellnessCollection";
import mintWellnessBadgeAction from "./mintWellnessBadge";
import trackHealthProgressAction from "./trackHealthProgress";
import requestWellnessDataAction from "./requestWellnessData";
import resolveHealthProfileAction from "./resolveHealthProfile";
import getHealthDataAction from "./getHealthData";
import getHealthActivityRateAction from "./getHealthActivityRate";
import fetchHealthScoreAction from "./fetchHealthScore";
import stakeWithHealthPointsAction from "./stakeWithHealthPoints";
import stakeWithPulseTokensAction from "./stakeWithPulseTokens";
import registerHealthProfileAction from "./registerHealthProfile";
import lendHealthResourcesAction from "./lendHealthResources";
import createWellnessTaskAction from "./createWellnessTask";
import resolveHealthDomainAction from "./resolveHealthDomain";
import fetchHealthPriceAction from "./fetchHealthPrice";
import getOwnedHealthProfilesForCategoryAction from "./getOwnedHealthProfilesForCategory";
import getPrimaryHealthProfileAction from "./getPrimaryHealthProfile";
import getAllHealthCategoriesAction from "./getAllHealthCategories";
import getOwnedHealthProfilesAction from "./getOwnedHealthProfiles";
import createHealthImageAction from "./createHealthImage";
import getMainHealthProfileDomainAction from "./getMainHealthProfileDomain";
import getAllRegisteredHealthProfilesAction from "./getAllRegisteredHealthProfiles";
import createWellnessLiquidityPoolAction from "./createWellnessLiquidityPool";
import launchPulseHealthTokenAction from "./launchPulseHealthToken";
import getHealthWalletAddressAction from "./getHealthWalletAddress";
import openHealthChallengeAction from "./openHealthChallenge";
import closeHealthChallengeAction from "./closeHealthChallenge";

export const ACTIONS = {
  HEALTH_WALLET_ADDRESS_ACTION: getHealthWalletAddressAction,
  DEPLOY_HEALTH_TOKEN_ACTION: deployHealthTokenAction,
  BALANCE_HEALTH_METRICS_ACTION: balanceHealthMetricsAction,
  TRANSFER_HEALTH_DATA_ACTION: transferHealthDataAction,
  DEPLOY_WELLNESS_COLLECTION_ACTION: deployWellnessCollectionAction,
  MINT_WELLNESS_BADGE_ACTION: mintWellnessBadgeAction,
  TRACK_HEALTH_PROGRESS_ACTION: trackHealthProgressAction,
  REQUEST_WELLNESS_DATA_ACTION: requestWellnessDataAction,
  RESOLVE_HEALTH_PROFILE_ACTION: resolveHealthProfileAction,
  GET_HEALTH_DATA_ACTION: getHealthDataAction,
  GET_HEALTH_ACTIVITY_RATE_ACTION: getHealthActivityRateAction,
  FETCH_HEALTH_SCORE_ACTION: fetchHealthScoreAction,
  STAKE_WITH_HEALTH_POINTS_ACTION: stakeWithHealthPointsAction,
  STAKE_WITH_PULSE_TOKENS_ACTION: stakeWithPulseTokensAction,
  REGISTER_HEALTH_PROFILE_ACTION: registerHealthProfileAction,
  LEND_HEALTH_RESOURCES_ACTION: lendHealthResourcesAction,
  CREATE_WELLNESS_TASK_ACTION: createWellnessTaskAction,
  RESOLVE_HEALTH_DOMAIN_ACTION: resolveHealthDomainAction,
  FETCH_HEALTH_PRICE_ACTION: fetchHealthPriceAction,
  GET_OWNED_HEALTH_PROFILES_FOR_CATEGORY_ACTION: getOwnedHealthProfilesForCategoryAction,
  GET_PRIMARY_HEALTH_PROFILE_ACTION: getPrimaryHealthProfileAction,
  GET_ALL_HEALTH_CATEGORIES_ACTION: getAllHealthCategoriesAction,
  GET_OWNED_HEALTH_PROFILES_ACTION: getOwnedHealthProfilesAction,
  CREATE_HEALTH_IMAGE_ACTION: createHealthImageAction,
  GET_MAIN_HEALTH_PROFILE_DOMAIN_ACTION: getMainHealthProfileDomainAction,
  GET_ALL_REGISTERED_HEALTH_PROFILES_ACTION: getAllRegisteredHealthProfilesAction,
  CREATE_WELLNESS_LIQUIDITY_POOL_ACTION: createWellnessLiquidityPoolAction,
  LAUNCH_PULSE_HEALTH_TOKEN_ACTION: launchPulseHealthTokenAction,
  OPEN_HEALTH_CHALLENGE_ACTION: openHealthChallengeAction,
  CLOSE_HEALTH_CHALLENGE_ACTION: closeHealthChallengeAction,
};

export type { Action, ActionExample, Handler } from "../types/action";
