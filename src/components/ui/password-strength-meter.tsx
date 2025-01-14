import React from "react";
import {
  ControllerProps,
  FieldPath,
  FieldValues,
  useWatch,
} from "react-hook-form";

import { EstimatePasswordStrength } from "@/lib/enums/estimate-password-strength.enum";
import { Label } from "./label";

export function PasswordStrengthMeter<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({ control, name }: Omit<ControllerProps<TFieldValues, TName>, "render">) {
  const password = useWatch({ control, name });

  const [low, medium, optimum, min, max] = [80, 100, 120, 0, 120];

  const lengthScore = password.length >= 8 ? 20 : 0;
  const extraLengthScore = password.length >= 12 ? 20 : 0;
  const uppercaseScore = /[A-Z]/.test(password) ? 20 : 0;
  const lowercaseScore = /[a-z]/.test(password) ? 20 : 0;
  const digitScore = /\d/.test(password) ? 20 : 0;
  const specialCharScore = /[@#$%^&+=!*]/.test(password) ? 20 : 0;

  const totalScore =
    lengthScore +
    extraLengthScore +
    uppercaseScore +
    lowercaseScore +
    digitScore +
    specialCharScore;

  let strengthLabel: EstimatePasswordStrength = EstimatePasswordStrength.VeryWeak;
  if (totalScore > low && totalScore < medium) {
    strengthLabel = EstimatePasswordStrength.Weak;
  }

  if (totalScore >= medium) {
    strengthLabel = EstimatePasswordStrength.Medium;
  }

  if (totalScore >= optimum) {
    strengthLabel = EstimatePasswordStrength.Strong;
  }

  const id = React.useId();

  return (
    <div className="flex flex-col gap-y-1">
      <Label htmlFor={id}>Password strength is: {strengthLabel}</Label>
      <meter
        id={id}
        value={totalScore}
        min={min}
        max={max}
        low={low}
        optimum={optimum}
        high={medium}
        className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700"
      />
    </div>
  );
}
