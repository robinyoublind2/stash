import {
  CriterionModifier,
  PhashDistanceCriterionInput,
} from "src/core/generated-graphql";
import { IPhashDistanceValue } from "../types";
import {
  BooleanCriterionOption,
  Criterion,
  CriterionOption,
  PhashDuplicateCriterion,
} from "./criterion";

export const PhashCriterionOption = new CriterionOption({
  messageID: "media_info.phash",
  type: "phash",
  parameterName: "phash_distance",
  inputType: "text",
  modifierOptions: [
    CriterionModifier.Equals,
    CriterionModifier.NotEquals,
    CriterionModifier.IsNull,
    CriterionModifier.NotNull,
  ],
});

export class PhashCriterion extends Criterion<IPhashDistanceValue> {
  constructor() {
    super(PhashCriterionOption, { value: "", distance: 0 });
  }

  public getLabelValue() {
    const { value, distance } = this.value;
    if (
      (this.modifier === CriterionModifier.Equals ||
        this.modifier === CriterionModifier.NotEquals) &&
      distance
    ) {
      return `${value} (${distance})`;
    } else {
      return `${value}`;
    }
  }

  protected toCriterionInput(): PhashDistanceCriterionInput {
    return {
      value: this.value.value,
      modifier: this.modifier,
      distance: this.value.distance,
    };
  }
}

export const DuplicatedCriterionOption = new BooleanCriterionOption(
  "duplicated_phash",
  "duplicated",
  "duplicated"
);

export class DuplicatedCriterion extends PhashDuplicateCriterion {
  constructor() {
    super(DuplicatedCriterionOption);
  }
}
