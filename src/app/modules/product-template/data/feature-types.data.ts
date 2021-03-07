import { FeatureTypeEnum } from "../../../shared/enums";

export const FEATURE_TYPES = [
    { name: "Boolean", value: FeatureTypeEnum[FeatureTypeEnum.Boolean] },
    { name: "Numeric", value: FeatureTypeEnum[FeatureTypeEnum.Numeric] },
    { name: "String", value: FeatureTypeEnum[FeatureTypeEnum.String] },
    { name: "DateTime", value: FeatureTypeEnum[FeatureTypeEnum.DateTime] }
]