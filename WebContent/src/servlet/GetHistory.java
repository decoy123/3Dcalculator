
import java.io.PrintWriter;

import javax.json.JsonArray;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class GetHistory extends HttpServlet {
	// private static final long serialVersionUID = 1L;

	/* content type(レスポンス) */
	private static final String JSON = "application/json";

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) {
		try {
			/* 計算履歴取得 */
			GetHistoryService service = new GetHistoryService();
			JsonArray serviceResult = service.getHistory();
			/* レスポンス設定 */
			response.setContentType(JSON);
			try (PrintWriter out = response.getWriter()) {
				out.print(serviceResult);
				out.flush();
			} catch (Throwable e) {
				e.printStackTrace();
			}
		} catch (Throwable e) {
			e.printStackTrace();
		}
	}
}
