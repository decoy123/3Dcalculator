
import java.io.File;
import java.nio.charset.StandardCharsets;
import java.nio.file.Paths;
import java.sql.Connection;
import java.util.Properties;

import javax.servlet.http.HttpServlet;

import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.io.FileUtils;

public class DeleteHistoryService extends HttpServlet {
	private static final long serialVersionUID = 4L;
	/* SQLファイルディレクトリ */
	private static final String SQL_DIRECTORY = Paths.get(Utils.SQL_SOURCE_DIRECTORY).toString();
	/* 計算履歴保存SQLファイル名 */
	private static final String SQL_DELETE_HISTORY = "DeleteHistory.sql";
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

	/**
	 *
	 *
	 */
	public int deleteHistory(String where, int historyId) throws Throwable {
		Properties info = new Properties();
		try (Connection conn = Utils.getConnection(info);) {
			/* SQL作成 */
			File sqlFile = Paths.get(SQL_DIRECTORY, SQL_DELETE_HISTORY).toFile();
			String sqlRaw = FileUtils.readFileToString(sqlFile, StandardCharsets.UTF_8);
			String sql = "";
			if (where.equals(ARG_ALL)) {
				sql = sqlRaw.replaceAll(TAG_WHERE, WHERE_ALL);
			} else if (where.equals(ARG_ONLY)) {
				sql = sqlRaw.replaceAll(TAG_WHERE, WHERE_ONLY + historyId);
			}
			/* SQL実行 */
			QueryRunner queryRunner = new QueryRunner();
			// int queryResult = ((Integer) queryRunner.query(conn, sql,
			// rsh)).intValue();
			int queryResult = queryRunner.update(conn, sql);
			return queryResult;
		}
	}
}
