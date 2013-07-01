package utils;

import java.util.*;
import org.json.*;

public class MapGenerator {

	private static final int RED = 1;
	private static final int BLUE = 0;
	private static final int NONE = -1;
	private static final String ID = "id";
	private static final String COLOR = "color";

	private static final String DEFAULT = "default";
	private static final String GOLD = "yellow";
	private static final String ROCK = "black";
	private static final String RED_CASTLE = "red_castle";
	private static final String BLUE_CASTLE = "blue_castle";

	int segmentsOnEachSide;
	int segmentSize;

	public MapGenerator(int segmentsOnEachSide, int segmentSize) {
		this.segmentsOnEachSide = segmentsOnEachSide;
		this.segmentSize = segmentSize;
	}

	public JSONArray GenerateMap() throws JSONException {
		if (segmentsOnEachSide < 1) {
			System.out.println("Number of segments must be greater than one");
			return null;
		}
		JSONArray map = new JSONArray();
		int currentSegment = 0;

		int rows = segmentsOnEachSide * segmentSize;
		int cols = segmentsOnEachSide * segmentSize;

		int redCastlePosition = PlaceCastle(segmentsOnEachSide, RED);
		int blueCastlePosition = PlaceCastle(segmentsOnEachSide, BLUE);

		for (int i = 0; i < segmentsOnEachSide; i++) {
			for (int j = 0; j < segmentsOnEachSide; j++) {

				if (currentSegment == redCastlePosition) {
					map.put(GenerateSegment(i * segmentSize, i * segmentSize + segmentSize, j * segmentSize, j
							* segmentSize + segmentSize, RED));
				} else if (currentSegment == blueCastlePosition) {
					map.put(GenerateSegment(i * segmentSize, i * segmentSize + segmentSize, j * segmentSize, j
							* segmentSize + segmentSize, BLUE));
				} else {
					map.put(GenerateSegment(i * segmentSize, i * segmentSize + segmentSize, j * segmentSize, j
							* segmentSize + segmentSize, NONE));
				}

				currentSegment++;
			}
		}		
		return map;
	}

	private int PlaceCastle(int size, int color) {
		ArrayList<Integer> possiblePositions = new ArrayList<Integer>();

		int totalSegments = size * size;
		for (int i = 0; i < totalSegments; i++) {
			if (i % size == 0 && color == RED) {
				possiblePositions.add(i);
			}
			if ((i + 1) % size == 0 && color == BLUE) {
				possiblePositions.add(i);
			}
		}

		
		return possiblePositions.get(Functions.GetRandom(0, possiblePositions.size() - 1));
	}

	private JSONArray GenerateSegment(int minCol, int maxCol, int minRow, int maxRow, int castle) throws JSONException {
		JSONArray segment = new JSONArray();

		int goldCount = 2;
		int currentHex = 0;

		int castlePosition = -1;
		String color;

		// segmentSize = maxCol - minCol
		if (castle == RED) {
			castlePosition = PlaceCastle((maxCol - minCol), RED);
		}
		if (castle == BLUE) {
			castlePosition = PlaceCastle((maxCol - minCol), BLUE);
		}

		for (int colIdx = minCol; colIdx < maxCol; colIdx++) {
			for (int rowIdx = minRow; rowIdx < maxRow; rowIdx++) {

				JSONObject newHex = new JSONObject();
				int dice = Functions.GetRandom(1, 100);

				color = DEFAULT;

				if (dice < 30 && currentHex != castlePosition) {
					color = ROCK;
				}

				if (dice >= 30 && dice < 35 && goldCount != 0 && castle == NONE) {
					color = GOLD;
					goldCount--;
				}

				int x1;
				int y1;

				// "Strighten" hex grid indexing
				if (colIdx % 2 == 0) {
					x1 = rowIdx - colIdx / 2;
					y1 = colIdx;
				} else {
					x1 = rowIdx - (colIdx - 1) / 2;
					y1 = colIdx;
				}

				newHex.put(ID, x1 + "," + y1);

				if (castle == RED && currentHex == castlePosition) {
					newHex.put(COLOR, RED_CASTLE);
				} else if (castle == BLUE && currentHex == castlePosition) {
					newHex.put(COLOR, BLUE_CASTLE);
				} else {
					newHex.put(COLOR, color);
				}

				segment.put(newHex);
				currentHex++;
			}
		}

		return segment;
	}

	public static void main(String[] args) {
		MapGenerator mapgen = new MapGenerator(4, 5);

		try {
			mapgen.GenerateMap();
		} catch (JSONException e) {
			e.printStackTrace();
		}
	}

}