
import java.io.PrintWriter;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.DecimalFormat;
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.math.NumberUtils;

public class Calculate extends HttpServlet {
	private static final long serialVersionUID = 1L;
	/* 逆ポーランド記法変換用演算子優先順位 */
	private static final Map<String, Integer> rpnRank = new HashMap<String, Integer>() {
		{
			/* 数値が高いほど優先順位が高い */
			put("*", 2);
			put("/", 2);
			put("+", 1);
			put("-", 1);
		}
	};
	/* FORMULA_ARRAY(リクエスト取得キー) */
	private static final String FORMULA_ARRAY = "FORMULA_ARRAY[]";
	/* 演算子 */
	private static final String PLUS = "+";
	private static final String MINUS = "-";
	private static final String MULTIPLE = "*";
	private static final String DIVIDE = "/";
	/* 計算結果フォーマット */
	private static final String RESULT_FORMAT = "0.##########";
	/* 演算エラー */
	private static final String ERROR = "ERROR";
	/* content type(レスポンス) */
	private static final String TEXT = "text/plain";

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) {
		/* リクエスト取得 */
		String[] formulaArray = request.getParameterValues(FORMULA_ARRAY);
		/* 式を逆ポーランド記法へ変換 */
		List<String> rpnArray = rpnConversion(formulaArray);
		/* 計算 */
		BigDecimal rpnAnswer = rpnCalculation(rpnArray);
		DecimalFormat decimalFormat = new DecimalFormat(RESULT_FORMAT);
		String result;
		if (rpnAnswer == null) {
			result = ERROR;
		} else {
			result = decimalFormat.format(rpnAnswer);
		}
		/* 計算履歴保存 */
		try {
			CalculateService service = new CalculateService();
			service.saveCalculationHistory(formulaArray, result);
		} catch (Throwable e) {
			e.printStackTrace();
		}
		/* レスポンス設定 */
		response.setContentType(TEXT);
		try (PrintWriter out = response.getWriter()) {
			out.print(result);
			out.flush();
		} catch (Throwable e) {
			e.printStackTrace();
		}
	}

	private List<String> rpnConversion(String[] formulaArray) {
		/* 変換結果 */
		List<String> rpnArray = new ArrayList<>();
		/* スタック */
		Deque<String> arithmaticOperatorStack = new ArrayDeque<>();

		for (String formulaElement : formulaArray) {
			if (NumberUtils.isParsable(formulaElement)) {
				/* 数字の場合変換結果へ格納 */
				rpnArray.add(formulaElement);
			} else {
				String stackFirst = arithmaticOperatorStack.peekFirst();
				/* 演算子の場合スタックへ退避 */
				if (stackFirst == null) {
					/* 1つ目の演算子は無条件でスタックへ退避 */
					arithmaticOperatorStack.addFirst(formulaElement);
				} else {
					if (rpnRank.get(stackFirst) < rpnRank.get(formulaElement)) {
						/* 優先順位がスタックの演算子より高い場合スタックへ退避 */
						arithmaticOperatorStack.addFirst(formulaElement);
					} else {
						/* 優先順位がスタックの演算子と同等か低い場合スタックを全て変換結果へ格納 */
						for (int j = 0; j < arithmaticOperatorStack.size(); j++) {
							rpnArray.add(arithmaticOperatorStack.remove());
						}
						/* スタックへ追加 */
						arithmaticOperatorStack.addFirst(formulaElement);
					}
				}
			}
		}
		/* スタックに残っている演算子を変換結果へ格納 */
		for (int i = 0; i < arithmaticOperatorStack.size(); i++) {
			rpnArray.add(arithmaticOperatorStack.remove());
		}
		return rpnArray;
	}

	private BigDecimal rpnCalculation(List<String> rpnArray) {
		Deque<BigDecimal> numberStack = new ArrayDeque<>();
		for (String rpnArrayElement : rpnArray) {
			if (NumberUtils.isParsable(rpnArrayElement)) {
				/* 数字の場合スタックに格納 */
				numberStack.addFirst(new BigDecimal(rpnArrayElement));
			} else {
				/* 数字以外の場合スタックから数字を取り出して計算 */
				BigDecimal number1 = numberStack.removeFirst();
				BigDecimal number2 = numberStack.removeFirst();
				BigDecimal answer = null;
				switch (rpnArrayElement) {
				case PLUS:
					answer = number2.add(number1);
					break;
				case MINUS:
					answer = number2.subtract(number1);
					break;
				case MULTIPLE:
					answer = number2.multiply(number1);
					break;
				case DIVIDE:
					if (number1.compareTo(BigDecimal.ZERO) == 0) {
						return null;
					} else {
						answer = number2.divide(number1, 10, RoundingMode.HALF_UP);
					}
					break;
				}
				/* 計算結果をスタックへ格納 */
				numberStack.addFirst(answer);
			}
		}
		return numberStack.removeFirst();
	}
}
