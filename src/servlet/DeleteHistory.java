
import java.io.PrintWriter;

import javax.json.JsonArray;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class DeleteHistory extends HttpServlet {
	private static final long serialVersionUID = 5L;

	/* WHERE(リクエスト) */
	private static final String WHERE = "WHERE";
	/* HISTORY_ID(リクエスト) */
	private static final String HISTORY_ID = "HISTORY_ID";
	/* content type(レスポンス) */
	private static final String JSON = "application/json";

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) {
		try {
			/* HTTPリクエスト取得 */
			String where = request.getParameter(WHERE);
			String strHistoryId = request.getParameter(HISTORY_ID);
			int historyId = 0;
			if (strHistoryId != null) {
				historyId = Integer.parseInt(strHistoryId);
			}
			/* 計算履歴削除 */
			DeleteHistoryService deleteService = new DeleteHistoryService();
			int deleteResult = deleteService.deleteHistory(where, historyId);
			if (deleteResult == 0) {
				/* 削除失敗 */
				throw new Exception();
			}
			/* 計算履歴取得 */
			GetHistoryService getService = new GetHistoryService();
			JsonArray getResult = getService.getHistory(where, historyId);
			/* レスポンス設定 */
			response.setContentType(JSON);
			try (PrintWriter out = response.getWriter()) {
				out.print(getResult);
				out.flush();
			} catch (Throwable e) {
				e.printStackTrace();
			}
		} catch (Throwable e) {
			e.printStackTrace();
		}
	}
}
