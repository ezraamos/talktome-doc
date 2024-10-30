import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertToAscii(inputString: string) {
  // remove non ascii characters
  const asciiString = inputString.replace(/[^\x00-\x7F]+/g, '');
  return asciiString;
}

export const dummyEmbedding = [
  {
    id: '510ab3108867ea3c6bb8fd814a57bea5',
    values: [
      -0.006794189, 0.029134514, 0.036321543, 0.034982026, 0.01287354,
      -0.016409094, -0.029366354, -0.006871469, 0.019616209, -0.008333347,
      -0.01866309, -0.0371201, -0.046728566, 0.010394144, 0.047527123,
      0.009486105, -0.008101507, -0.00621137, -0.033616748, -0.001261433,
      -0.008391307, -0.0000047010667, -0.0006524515, -0.015018056,
      -0.0040249936, -0.006871469, -0.019667728, -0.04461625, 0.059144866,
      0.013974777, 0.06661525, -0.03176203, 0.005651091, 0.01953893,
      -0.023724923, -0.003165255, 0.012905739, 0.010233143, 0.01868885,
      -0.020466287, -0.036553383, 0.04489961, 0.001891747, 0.03268939,
      -0.016602295, -0.03294699, 0.023892362, -0.06445142, -0.026532758,
      0.051622957, -0.046136085, 0.017671332, -0.013923258, 0.048248403,
      -0.03199387, 0.0066782692, 0.017658452, 0.045955766, -0.030190673,
      0.0009893434, 0.017671332, 0.027717715, -0.0123519, -0.0384081,
      0.006903669, -0.011076783, -0.022643004, 0.071973324, -0.0026999656,
      -0.0013765479, -0.011134743, 0.02552812, 0.06501814, -0.017619813,
      -0.017156133, -0.02585012, 0.016164374, -0.0019674168, 0.03250907,
      0.057547748, 0.0036385942, 0.003234485, -0.039412737, -0.0064271097,
      -0.0052775717, -0.009640665, -0.022127805, -0.054147433, 0.0013660828,
      -0.035832103, -0.022565724, -0.011810942, -0.029314833, 0.008107947,
      -0.0089966655, 0.015468855, -0.027949555, 0.006787749, 0.007818148,
      -0.000023634258,
    ],
    metadata: {
      text: 'RiskScoreThe CreditorWatch RiskScore is the most advanced algorithm in the market and is designed to ensure you make the right decision. TheRiskScore has been developed using the latest machine learning techniques in combination with CreditorWatch’s extensive data. TheCreditorWatch RiskScore should be used in partnership with your internal credit procedures and policies. What is “probability of default”? This is the likelihood that an entity will NOT be able to meet their financial commitments in the next 12 months eg: pay an invoice.Lower riskRiskScore Information credit rating out of 850pointsRisk levelHigher riskRiskScore Historical InformationWithin the last 12 Months-RatingRiskScore advice for the - RangeReport Generated: 28-02-2024 ASIC Extract: 28-02-2024 ASIC Extract Status: Correct as at 28-02-20245 of 22',
      pageNumber: 5,
    },
  },
  {
    id: '1e16e79e79940f677aa9b4d7c622c4a5',
    values: [
      0.001884926, 0.029735904, 0.05825594, 0.011577179, 0.044881392,
      0.005682862, -0.010083776, 0.014497906, 0.009337074, 0.014273235,
      -0.03118966, -0.027224872, -0.049929887, 0.011398763, 0.032352664,
      0.012052953, 0.030000225, 0.004962592, -0.016586026, 0.043691956,
      0.013678516, 0.02229532, -0.015806286, -0.0014636674, -0.020180767,
      -0.006839258, -0.027753511, -0.039383553, 0.04966557, -0.048132516,
      0.062326457, -0.017669735, 0.02242748, 0.01971821, -0.0781856,
      -0.0033139014, 0.0008474733, 0.01255516, 0.046863787, -0.0640181,
      -0.037586182, 0.017352553, 0.040890172, -0.004305098, -0.008967027,
      -0.0083524855, 0.03824698, -0.043374773, -0.03874919, 0.020973725,
      -0.081780344, -0.005316119, 0.027436329, 0.0010952725, -0.040625855,
      0.012409784, 0.02497816, 0.0035517886, 0.022612503, -0.019586049,
      0.0069582015, 0.024105906, 0.010367919, -0.034097172, -0.03391215,
      0.015700558, -0.02566539, 0.06354232, 0.004087035, -0.0064857313,
      0.008319445, -0.023365812, 0.0251764, -0.033224918, -0.023312949,
      0.021304123, 0.045039985, -0.051040027, 0.010235759, 0.04482853,
      -0.047101673, 0.022083865, -0.03933069, 0.016612459, 0.0052401274,
      -0.0070573213, -0.057885896, -0.02814999, 0.0014355835, -0.04633515,
      -0.015224784, -0.03547163, -0.017418632, 0.02657729, 0.025784334,
      0.013202742, -0.0054317587, -0.0052203033, 0.00375994, -0.0005323553,
    ],
    metadata: {
      text: "Score RecommendationsRiskScore RatingRisk LevelRecommendationA1, A2, A3Very LowVery strong credit quality based on behavioural and business demographics. Likelihood ofdefault or insolvency is considered very low. Extend terms within consideration.B1, B2LowStrong credit quality based on behavioural and business demographics. Likelihood ofdefault or insolvency is considered very low. Extend terms within consideration.B3, C1NeutralLower than average default risk for an Australian business. Business demographics andbehaviours indicative of low likelihood of default or insolvency in the short to mediumterm. Extend terms and monitor ongoing payment behaviour.C2AcceptableAverage default risk for an Australian business. Standard underwriting criteria and duediligence recommended prior to extending credit. Extend terms, closely monitor ongoingpayment behaviour.C3PotentialRiskBehaviours and business demographics may indicate increased risk for some businessesin this group. Assessment of the entity's financial position and cashflow is recommendedprior to extending material unsecured credit.D1, D2, D3HighRisk of default or insolvency is significantly higher than the average for Australianbusinesses. COD trading highly recommended.EImpairedEntity is highly vulnerable to default or insolvency in the short term.FDefaultedOne or more creditors has initiated legal proceedings or other significant actions inresponse to unpaid debt obligations, or the entity is entering or has entered insolvency.Please note that the rating and recommendation should be used in partnership with your company’s internal credit procedures andpolicies. The rating should not be used as the sole reason in making decision about the entity.Report Generated: 28-02-2024 ASIC Extract: 28-02-2024 ASIC Extract Status: Correct as at 28-02-20246 of 22",
      pageNumber: 6,
    },
  },
  {
    id: '90e0a486a3cc91d806aaf0553a6d303f',
    values: [
      -0.005042517, 0.03781529, 0.045561977, 0.029810386, 0.027959788,
      0.022192813, -0.010536924, -0.0026145056, 0.03821697, -0.021819824,
      0.0031148123, -0.06599027, -0.04100004, -0.051300257, 0.06960539,
      0.030212065, 0.032593455, -0.010142417, -0.030929351, 0.04160256,
      0.0038769282, 0.029179174, -0.023197014, -0.004719739, -0.017229198,
      -0.006821385, 0.0044615157, -0.013951203, 0.061514404, -0.046594866,
      0.08027859, -0.03640941, 0.042951055, 0.036696326, -0.062088232,
      0.021590294, 0.009123872, 0.05632126, 0.02374215, -0.03508961,
      -0.00979812, -0.0127246445, 0.033253357, -0.007438251, -0.032019626,
      -0.033482887, -0.020858662, -0.039881073, 0.0061327913, 0.024186866,
      -0.07023659, 0.029982533, 0.0122584095, -0.0011781415, -0.05029606,
      -0.016224999, -0.0031435038, 0.009984614, -0.021676367, -0.009317539,
      0.0145035125, 0.054255474, 0.018907646, -0.031560563, -0.034056716,
      -0.011763482, -0.04223377, 0.08354942, 0.0009871642, 0.011648716,
      0.0021357175, 0.013922512, 0.018749842, -0.033827186, -0.007154923,
      -0.012215372, 0.021231651, -0.03170402, 0.02303921, 0.026941244,
      -0.056034345, 0.01972535, -0.036294647, -0.019251943, 0.016899247,
      0.0018990134, -0.06725269, -0.021116884, -0.036294647, -0.037098005,
      -0.0039450703, -0.0013511865, -0.038819492, 0.003380208, 0.0053150854,
      0.028834878, 0.0040813545, -0.014560896, -0.031244956, 0.01618196,
    ],
    metadata: {
      text: "Score RecommendationsRiskScore RatingRisk LevelRecommendationA1, A2, A3Very LowVery strong credit quality based on behavioural and business demographics. Likelihood ofdefault or insolvency is considered very low. Extend terms within consideration.B1, B2LowStrong credit quality based on behavioural and business demographics. Likelihood ofdefault or insolvency is considered very low. Extend terms within consideration.B3, C1NeutralLower than average default risk for an Australian business. Business demographics andbehaviours indicative of low likelihood of default or insolvency in the short to mediumterm. Extend terms and monitor ongoing payment behaviour.C2AcceptableAverage default risk for an Australian business. Standard underwriting criteria and duediligence recommended prior to extending credit. Extend terms, closely monitor ongoingpayment behaviour.C3PotentialRiskBehaviours and business demographics may indicate increased risk for some businessesin this group. Assessment of the entity's financial position and cashflow is recommendedprior to extending material unsecured credit.D1, D2, D3HighRisk of default or insolvency is significantly higher than the average for Australianbusinesses. COD trading highly recommended.EImpairedEntity is highly vulnerable to default or insolvency in the short term.FDefaultedOne or more creditors has initiated legal proceedings or other significant actions inresponse to unpaid debt obligations, or the entity is entering or has entered insolvency.Please note that the rating and recommendation should be used in partnership with your company’s internal credit procedures andpolicies. The rating should not be used as the sole reason in making decision about the entity.Report Generated: 28-02-2024 ASIC Extract: 28-02-2024 ASIC Extract Status: Correct as at 28-02-20246 of 22",
      pageNumber: 6,
    },
  },
  {
    id: 'ac18e728fff5ddb17226ebbd2f5fef5a',
    values: [
      -0.018008247, -0.020515898, -0.02204529, -0.025944551, -0.0017317609,
      0.011491108, -0.049353894, 0.0037304766, 0.013984981, -0.052274894,
      0.06547451, -0.06563985, -0.030615397, -0.044889722, 0.05908138,
      -0.0124487, 0.0066928123, 0.042988315, -0.03149721, 0.055884812,
      -0.020763908, 0.010526626, 0.0074402858, -0.048141405, -0.008067198,
      -0.0112224305, -0.016809534, -0.010085721, 0.016341072, -0.022555089,
      0.032930154, -0.026054777, 0.018862503, -0.0104164, -0.04370479,
      0.002962336, 0.01423299, 0.0477005, -0.017057544, 0.016795756,
      -0.012868938, -0.05979785, 0.026578354, 0.035520475, -0.04651556,
      -0.00024434965, 0.0019444635, -0.033398617, -0.012248915, 0.041610487,
      -0.050373487, 0.003923373, -0.059026267, 0.013564743, 0.006737592,
      -0.016685529, -0.0021580274, 0.032323908, -0.018090917, 0.0049188556,
      -0.0024680393, -0.009782597, 0.012545148, -0.029733585, -0.0115806665,
      -0.012111131, -0.037228983, 0.045440856, 0.016299738, -0.02921001,
      -0.032930154, 0.022362191, 0.06635632, -0.012620929, -0.033536397,
      -0.024525385, 0.012958498, -0.0063345763, 0.023988033, 0.0061313463,
      -0.013847198, 0.040397994, -0.03921306, -0.021494158, 0.038386364,
      -0.01821492, -0.05704219, -0.031690106, -0.026592132, -0.020309225,
      -0.0130549455, -0.009079904, 0.0032723479, -0.0073025026, -0.032268792,
      -0.02806641, -0.014508557, 0.011849344, 0.0002854693, 0.020557234,
    ],
    metadata: {
      text: 'Payment RatingNot AvailableInsufficient data available to calculate a predictionReport Generated: 28-02-2024 ASIC Extract: 28-02-2024 ASIC Extract Status: Correct as at 28-02-20247 of 22',
      pageNumber: 7,
    },
  },
];
