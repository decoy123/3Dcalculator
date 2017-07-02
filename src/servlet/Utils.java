
import java.sql.Connection;
import java.sql.DriverManager;
import java.util.Properties;

/**
 *
 */
public class Utils {
	/* DB_ドライバ */
	private static final String DB_DRIVER = "org.postgresql.Driver";
	/* USER */
	private static final String USER = "user";
	/* PASSWORD */
	private static final String PASSWORD = "password";
	/* DB URL */
	private static final String DB_URL = "jdbc:postgresql://localhost:5432/3DCalculator";
	/* DB ユーザー名 */
	private static final String DB_USER_NAME = "postgres";
	/* DB パスワード */
	private static final String DB_PASSWORD = "postgres";
	/* SQLフォルダのパス */
	public static final String SQL_SOURCE_DIRECTORY = "./3DCalculator/src/sql";

	/**
	 *
	 */
	public static Connection getConnection(Properties info) throws Throwable {
		Class.forName(DB_DRIVER);
		info.setProperty(USER, DB_USER_NAME);
		info.setProperty(PASSWORD, DB_PASSWORD);
		Connection connection = DriverManager.getConnection(DB_URL, info);
		return connection;
	}
}
