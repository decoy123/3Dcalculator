
import java.io.File;
import java.nio.charset.StandardCharsets;
import java.nio.file.Paths;
import java.sql.Array;
import java.sql.Connection;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import javax.servlet.http.HttpServlet;

import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.ResultSetHandler;
import org.apache.commons.dbutils.handlers.MapListHandler;
import org.apache.commons.io.FileUtils;

public class GetHistoryService extends HttpServlet {
	private static final long serialVersionUID = 4L;
	/* SQLファイルディレクトリ */
	private static final String SQL_DIRECTORY = Paths.get(Utils.SQL_SOURCE_DIRECTORY).toString();
	/* 計算履歴保存SQLファイル名 */
	private static final String SQL_GET_HISTORY = "GetHistory.sql";
	/* ALL(引数判定用) */
	private static final String ARG_ALL = "all";
	/* ONLY(引数判定用) */
	private static final String ARG_ONLY = "only";
	/* ALL(引数判定用) */
	private static final String WHERE_ALL = "1 = 1";
	/* ONLY(引数判定用) */
	private static final String WHERE_ONLY = "history_id = ";
	/* WHERE句置換用タグ */
	private static final String TAG_WHERE = "<% WHERE %>";
	/* history_id(結果用JSONキー) */
	private static final String HISTORY_ID = "HISTORY_ID";
	/* formula(結果用JSONキー) */
	private static final String FORMULA = "FORMULA";
	/* result(結果用JSONキー) */
	private static final String RESULT = "RESULT";

	/**
	 *
	 *
	 */
	public JsonArray getHistory(String where, int historyId) throws Throwable {
		Properties info = new Properties();
		try (Connection conn = Utils.getConnection(info);) {
			/* SQL作成 */
			File sqlFile = Paths.get(SQL_DIRECTORY, SQL_GET_HISTORY).toFile();
			String sqlRaw = FileUtils.readFileToString(sqlFile, StandardCharsets.UTF_8);
			String sql = "";
			if (where.equals(ARG_ALL)) {
				sql = sqlRaw.replaceAll(TAG_WHERE, WHERE_ALL);
			} else if (where.equals(ARG_ONLY)) {
				sql = sqlRaw.replaceAll(TAG_WHERE, WHERE_ONLY + historyId);
			}
			/* SQL結果が格納されるオブジェクト形式指定 */
			ResultSetHandler<List<Map<String, Object>>> rsh = new MapListHandler();
			/* SQL実行 */
			QueryRunner queryRunner = new QueryRunner();
			List<Map<String, Object>> queryResult = queryRunner.query(conn, sql, rsh);
			JsonArrayBuilder result = Json.createArrayBuilder();
			for (Map<String, Object> record : queryResult) {
				Array formulaArray = (Array) record.get(FORMULA);
				String[] formula = (String[]) formulaArray.getArray();
				JsonArrayBuilder formulaJson = Json.createArrayBuilder();
				for (String element : formula) {
					formulaJson.add(element);
				}
				JsonObject jsonRecord = Json.createObjectBuilder()
						.add(HISTORY_ID, ((Integer) record.get(HISTORY_ID)).intValue()).add(FORMULA, formulaJson)
						.add(RESULT, (String) record.get(RESULT)).build();
				result.add(jsonRecord);
			}
			return result.build();
		}
	}
}
