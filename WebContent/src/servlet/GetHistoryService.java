
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
	/* SQLファイルディレクトリ */
	private static final String SQL_DIRECTORY = Paths.get("./3DCalculator/src/sql").toString();
	/* 計算履歴保存SQLファイル名 */
	private static final String SQL_GET_HISTORY = "GetHistory.sql";
	/* formula(結果用JSONキー) */
	private static final String FORMULA = "FORMULA";
	/* result(結果用JSONキー) */
	private static final String RESULT = "RESULT";

	/**
	 *
	 *
	 */
	public JsonArray getHistory() throws Throwable {
		Properties info = new Properties();
		try (Connection conn = Utils.getConnection(info);) {
			/* SQL取得 */
			File sqlFile = Paths.get(SQL_DIRECTORY, SQL_GET_HISTORY).toFile();
			String sql = FileUtils.readFileToString(sqlFile, StandardCharsets.UTF_8);
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
				JsonObject jsonRecord = Json.createObjectBuilder().add(FORMULA, formulaJson)
						.add(RESULT, (String) record.get(RESULT)).build();
				result.add(jsonRecord);
			}
			return result.build();
		}
	}
}
