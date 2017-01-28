
import java.io.File;
import java.nio.charset.StandardCharsets;
import java.nio.file.Paths;
import java.sql.Array;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Properties;

import javax.servlet.http.HttpServlet;

import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.io.FileUtils;

public class CalculateService extends HttpServlet {
	private static final long serialVersionUID = 2L;
	/* SQLファイルディレクトリ */
	private static final String SQL_DIRECTORY = Paths.get(Utils.SQL_SOURCE_DIRECTORY).toString();
	/* 計算履歴保存SQLファイル名 */
	private static final String SQL_SAVE_HISTORY = "SaveHistory.sql";
	/* PostgreSQL用配列の型 */
	private static final String TEXT = "text";

	/**
	 *
	 *
	 */
	public void saveCalculationHistory(String[] formulaArray, String result) throws Throwable {
		Properties info = new Properties();
		try (Connection conn = Utils.getConnection(info);) {
			/* SQL取得 */
			File sqlFile = Paths.get(SQL_DIRECTORY, SQL_SAVE_HISTORY).toFile();
			String sql = FileUtils.readFileToString(sqlFile, StandardCharsets.UTF_8);
			Array formula = conn.createArrayOf(TEXT, formulaArray);
			// /* SQL結果が格納されるオブジェクト形式指定 */
			// ResultSetHandler<List<Map<String, Object>>> resultSetHandler =
			// new MapListHandler();
			/* SQL実行 */
			QueryRunner queryRunner = new QueryRunner();
			int insertResult = queryRunner.update(conn, sql, formula, result);
			if (insertResult == 0) {
				throw new SQLException();
			} else {
				System.out.println("insert:" + insertResult);
			}
		}
	}
}
