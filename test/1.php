<?php
$income = 25000; // 收入
$taxFeeIncome = 0; // 免税收入
$reducedFee = 5000; // 减免费用
$specialDeduction = 674.41; // 专项扣除
$specialAdditionDeduction = 1000; // 专项附加扣除
$otherDeduction = 0; // 其他扣除
$donateDeduction = 0; // 准予扣除的捐赠额

// 工资薪金纳税计算
/*
 * 工资薪金纳税计算
 *
 *   级数      全年应纳税所得额  税率 速算扣除数
 *   1       0 < x <=  36000 0.03        0
 *   2   36000 < x <= 144000 0.10     2520
 *   3  144000 < x <= 300000 0.20    16920
 *   4  300000 < x <= 420000 0.25    31920
 *   5  420000 < x <= 660000 0.30    52920
 *   6  660000 < x <= 960000 0.35    85920
 *   7  960000 < x           0.45   181920
 *
 *   每年:应纳税所得额 = (
 *     + 合计收入:296188.35
 *     - 合计免税收入:60000
 *     - 合计减免费用:0
 *     - 合计专项扣除:8337.24
 *     - 合计专项附加扣除:12000
 *     - 合计其它扣除:0
 *     - 合计准予扣除的捐赠额:0
 *   ) = 215851.11
 *   每年:应纳税额 = (36000-0)*0.03 + (144000-36000)*0.1 + (215851.11-144000)*0.2 = 26250.22
 *   每月:应预扣预缴税额 = (
 *    累计收入
 *    - 累计免税收入
 *    - 累计减免费用
 *    - 累计专项扣除
 *    - 累计专项附加扣除
 *    - 累计其它扣除
 *    - 累计准予扣除的捐赠额
 *   ) x 预扣率 - 速算扣除数 - 累计已缴税额
 *   01月 (24976.35-0-5000-674.41-1000-0-0)*0.03 - 0 - 0 = 549.06
 *   02月 (49999.66-0-10000-1348.82-2000-0-0)*0.1 - 2520 - 549.06 = 596.02
 *   03月 (75006.93-0-15000-2023.23-3000-0-0)*0.1 - 2520 - 1145.08 = 1833.29
 *   04月 (100006.93-0-20000-2697.64-4000-0-0)*0.1 - 2520 - 2978.37 = 1832.56
 *   05月 (125006.93-0-25000-3372.05-5000-0-0)*0.1 - 2520 - 4810.93 = 1832.56
 *   06月 (150006.93-0-30000-4046.46-6000-0-0)*0.1 - 2520 - 6643.49 = 1832.56
 *   07月 (175006.93-0-35000-4761.59-7000-0-0)*0.1 - 2520 - 8476.05 = 1828.48
 *   08月 (200006.93-0-40000-5476.72-8000-0-0)*0.2 - 16920 - 10304.53 = 2081.51
 *   09月 (225006.93-0-45000-6191.85-9000-0-0)*0.2 - 16920 - 12386.04 = 3656.98
 *   10月 (250006.93-0-50000-6906.98-10000-0-0)*0.2 - 16920 - 16043.02 = 3656.97
 *   11月 (271188.35-0-55000-7622.11-11000-0-0)*0.2 - 16920 - 19669.99 = 2893.26
 *   12月 (296188.35-0-60000-8337.25-12000-0-0)*0.2 - 16920 - 22593.25 = 3656.97
*/
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
    $accIncome = bcadd($accIncome, $income, 2); // 累计收入
    $accTaxFeeIncome = bcadd($accTaxFeeIncome, $taxFeeIncome, 2); // 累计免税收入
    $accReducedFee = bcadd($accReducedFee, $reducedFee, 2); // 累计减免费用
    $accSpecialDeduction = bcadd($accSpecialDeduction, $specialDeduction, 2); // 累计专项扣除
    $accSpecialAdditionDeduction = bcadd($accSpecialAdditionDeduction, $specialAdditionDeduction, 2); // 累计专项附加扣除
    $accOtherDeduction = bcadd($accOtherDeduction, $otherDeduction, 2); // 累计其他扣除
    $accDonateDeduction = bcadd($accDonateDeduction, $donateDeduction, 2); // 累计准予扣除的捐赠额
    // 应纳税所得额
    $taxableIncome = $accIncome;
    $taxableIncome = bcsub($taxableIncome, $accTaxFeeIncome, 2);
    $taxableIncome = bcsub($taxableIncome, $accReducedFee, 2);
    $taxableIncome = bcsub($taxableIncome, $accSpecialDeduction, 2);
    $taxableIncome = bcsub($taxableIncome, $accSpecialAdditionDeduction, 2);
    $taxableIncome = bcsub($taxableIncome, $accOtherDeduction, 2);
    $taxableIncome = bcsub($taxableIncome, $accDonateDeduction, 2);
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
    $tax = round(bcmul($taxableIncome, $taxRate, 4), 2);
    $tax = bcsub($tax, $quickDeduction, 2);
    $tax = bcsub($tax, $accTax, 2);
    // 累计纳税额
    $accTax = bcadd($accTax, $tax, 2);
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
print_r($res);