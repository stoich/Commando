package utils;

public class Functions {

	public static int GetRandom(int min, int max){		
		return (int)Math.floor(Math.random() * (max - min + 1)) + min;		
	}
}
