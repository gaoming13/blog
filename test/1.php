<?php
$income = 25000; // 收入
$taxFeeIncome = 0; // 免税收入
$reducedFee = 5000; // 减免费用
$specialDeduction = 674.41; // 专项扣除
$specialAdditionDeduction = 1000; // 专项附加扣除
$otherDeduction = 0; // 其他扣除
$donateDeduction = 0; // 准予扣除的捐赠额

// 工资薪金纳税计算
function calcTax($income, $taxFeeIncome, $reducedFee, $specialDeduction, $specialAdditionDeduction, $otherDeduction, $donateDeduction) {
  $accIncome = 0; // 累计收入
  $accTaxFeeIncome = 0; // 累计免税收入
  $accReducedFee = 0; // 累计减免费用
  $accSpecialDeduction = 0; // 累计专项扣除
  $accSpecialAdditionDeduction = 0; // 累计专项附加扣除
  $accOtherDeduction = 0; // 累计其他扣除
  $accDonateDeduction = 0; // 累计准予扣除的捐赠额
  $periods = []; // 每期明细
  $accTax = 0; // 累计纳税额

  for ($i = 1; $i <= 12; $i++) {
    $accIncome = bcadd($accIncome, $income); // 累计收入
    $accTaxFeeIncome = bcadd($accTaxFeeIncome, $taxFeeIncome); // 累计免税收入
    $accReducedFee = bcadd($accReducedFee, $reducedFee); // 累计减免费用
    $accSpecialDeduction = bcadd($accSpecialDeduction, $specialDeduction); // 累计专项扣除
    $accSpecialAdditionDeduction = bcadd($accSpecialAdditionDeduction, $specialAdditionDeduction); // 累计专项附加扣除
    $accOtherDeduction = bcadd($accOtherDeduction, $otherDeduction); // 累计其他扣除
    $accDonateDeduction = bcadd($accDonateDeduction, $donateDeduction); // 累计准予扣除的捐赠额
    // 应纳税所得额
    $taxableIncome = $accIncome;
    $taxableIncome = bcsub($taxableIncome, $accTaxFeeIncome);
    $taxableIncome = bcsub($taxableIncome, $accReducedFee);
    $taxableIncome = bcsub($taxableIncome, $accSpecialDeduction);
    $taxableIncome = bcsub($taxableIncome, $accSpecialAdditionDeduction);
    $taxableIncome = bcsub($taxableIncome, $accOtherDeduction);
    $taxableIncome = bcsub($taxableIncome, $accDonateDeduction);
    // 税率
    $taxRate = 0;
    // 速算扣除数
    $quickDeduction = 0;
    // 应纳税额
    if ($taxableIncome <= 36000) { $taxRate = 0.03; $quickDeduction = 0; }
    else if ($taxableIncome <= 144000) { $taxRate = 0.1; $quickDeduction = 2520; }
    else if ($taxableIncome <= 300000) { $taxRate = 0.2; $quickDeduction = 16920; }
    else if ($taxableIncome <= 420000) { $taxRate = 0.25; $quickDeduction = 31920; }
    else if ($taxableIncome <= 660000) { $taxRate = 0.3; $quickDeduction = 52920; }
    else if ($taxableIncome <= 960000) { $taxRate = 0.35; $quickDeduction = 85920; }
    else { $taxRate = 0.45; $quickDeduction = 181920; }
    $tax = round(bcmul($taxableIncome, $taxRate), 2);
    $tax = bcsub($tax, $quickDeduction);
    $tax = bcsub($tax, $accTax);
    // 累计纳税额
    $accTax = bcadd($accTax, $tax);
    // 入数组
    $periods[] = [
      'accIncome' => $accIncome, // 累计收入
      'accTaxFeeIncome' => $accTaxFeeIncome, // 累计免税收入
      'accReducedFee' => $accReducedFee, // 累计减免费用
      'accSpecialDeduction' => $accSpecialDeduction, // 累计专项扣除
      'accSpecialAdditionDeduction' => $accSpecialAdditionDeduction, // 累计专项附加扣除
      'accOtherDeduction' => $accOtherDeduction, // 累计其他扣除
      'accDonateDeduction' => $accDonateDeduction, // 累计准予扣除的捐赠额

      'taxableIncome' => $taxableIncome, // 应纳税所得额
      'taxRate' => $taxRate, // 税率
      'quickDeduction' => $quickDeduction, // 速算扣除数
      'tax' => $tax, // 应纳税额
      'accTax' => $accTax, // 累计纳税额
    ];
  }
  return [
    'income' => $income, // 收入
    'taxFeeIncome' => $taxFeeIncome, // 免税收入
    'reducedFee' => $reducedFee, // 减免费用
    'specialDeduction' => $specialDeduction, // 专项扣除
    'specialAdditionDeduction' => $specialAdditionDeduction, // 专项附加扣除
    'otherDeduction' => $otherDeduction, // 其他扣除
    'donateDeduction' => $donateDeduction, // 准予扣除的捐赠额

    'sumIncome' => $accIncome, // 合计收入
    'sumTaxFeeIncome' => $accTaxFeeIncome, // 合计免税收入
    'sumReducedFee' => $accReducedFee, // 合计减免费用
    'sumSpecialDeduction' => $accSpecialDeduction, // 合计专项扣除
    'sumSpecialAdditionDeduction' => $accSpecialAdditionDeduction, // 合计专项附加扣除
    'sumOtherDeduction' => $accOtherDeduction, // 合计其他扣除
    'sumDonateDeduction' => $accDonateDeduction, // 合计准予扣除的捐赠额

    'sumTax' => $accTax, // 合计纳税额

    'periods' => $periods, // 每期明细
  ];
}
$res = calcTax($income, $taxFeeIncome, $reducedFee, $specialDeduction, $specialAdditionDeduction, $otherDeduction, $donateDeduction);
var_dump($res);