RMS.LoadLibrary("rmgen");var tGrass = ["steppe_grass_a", "steppe_grass_b", "steppe_grass_c", "steppe_grass_d"];var tGrassPForest = "steppe_grass_c";var tGrassDForest = "steppe_grass_c";var tGrassA = "steppe_grass_b";var tGrassB = "steppe_grass_c";var tGrassC = ["steppe_grass_b", "steppe_grass_c", "steppe_grass_d"];var tDirt = ["steppe_dirt_a", "steppe_dirt_b"];var tRoad = "road_stones";var tRoadWild = "road_stones";var tShoreBlend = "desert_shore_stones";var tShore = "dirta";var tWater = "desert_sand_wet";// gaia entitiesvar oBeech = "gaia/flora_tree_poplar_lombardy";var oBush = "gaia/flora_bush_temperate";var oBerryBush = "gaia/flora_bush_berry";var oChicken = "gaia/fauna_chicken";var oDeer = "gaia/fauna_rabbit";var oFish = "gaia/fauna_fish";var oSheep = "gaia/fauna_sheep";var oStoneLarge = "gaia/geology_stonemine_medit_quarry";var oStoneSmall = "gaia/geology_stone_mediterranean";var oMetalLarge = "gaia/geology_metal_mediterranean_slabs";// decorative propsvar aGrass = "actor|props/flora/grass_soft_small_tall.xml";var aGrassShort = "actor|props/flora/grass_soft_large.xml";var aRockLarge = "actor|geology/stone_granite_med.xml";var aRockMedium = "actor|geology/stone_granite_med.xml";var aBushMedium = "actor|props/flora/bush_medit_me.xml";var aBushSmall = "actor|props/flora/bush_medit_sm.xml";var pForestD = [tGrassDForest + TERRAIN_SEPARATOR + oBeech, tGrassDForest];var pForestP = [tGrassPForest + TERRAIN_SEPARATOR + oBeech, tGrassPForest];const BUILDING_ANGlE = -PI/4;// initialize maplog("Initializing map...");InitMap();var numPlayers = getNumPlayers();var mapSize = getMapSize();var mapArea = mapSize*mapSize;// create tile classesvar clPlayer = createTileClass();var clHill = createTileClass();var clForest = createTileClass();var clWater = createTileClass();var clDirt = createTileClass();var clRock = createTileClass();var clMetal = createTileClass();var clFood = createTileClass();var clBaseResource = createTileClass();var clSettlement = createTileClass();// randomize player ordervar playerIDs = [];for (var i = 0; i < numPlayers; i++){	playerIDs.push(i+1);}playerIDs = sortPlayers(playerIDs);// place playersvar playerX = new Array(numPlayers);var playerZ = new Array(numPlayers);var playerAngle = new Array(numPlayers);var startAngle = randFloat(0, TWO_PI);for (var i = 0; i < numPlayers; i++){	playerAngle[i] = startAngle + i*TWO_PI/numPlayers;	playerX[i] = 0.5 + 0.35*cos(playerAngle[i]);	playerZ[i] = 0.5 + 0.35*sin(playerAngle[i]);}for (var i = 0; i < numPlayers; i++){	var id = playerIDs[i];	log("Creating base for player " + id + "...");		// some constants	var radius = scaleByMapSize(15,25);	var cliffRadius = 2;	var elevation = 20;		// get the x and z in tiles	var fx = fractionToTiles(playerX[i]);	var fz = fractionToTiles(playerZ[i]);	var ix = round(fx);	var iz = round(fz);	addToClass(ix, iz, clPlayer);	addToClass(ix+5, iz, clPlayer);	addToClass(ix, iz+5, clPlayer);	addToClass(ix-5, iz, clPlayer);	addToClass(ix, iz-5, clPlayer);		// create the city patch	var cityRadius = radius/3;	var placer = new ClumpPlacer(PI*cityRadius*cityRadius, 0.6, 0.3, 10, ix, iz);	var painter = new LayeredPainter([tRoadWild, tRoad], [1]);	createArea(placer, painter, null);		// create starting units	placeCivDefaultEntities(fx, fz, id, BUILDING_ANGlE);		// create animals	for (var j = 0; j < 2; ++j)	{		var aAngle = randFloat(0, TWO_PI);		var aDist = 7;		var aX = round(fx + aDist * cos(aAngle));		var aZ = round(fz + aDist * sin(aAngle));		var group = new SimpleGroup(			[new SimpleObject(oChicken, 5,5, 0,3)],			true, clBaseResource, aX, aZ		);		createObjectGroup(group, 0);	}		// create berry bushes	var bbAngle = randFloat(0, TWO_PI);	var bbDist = 12;	var bbX = round(fx + bbDist * cos(bbAngle));	var bbZ = round(fz + bbDist * sin(bbAngle));	group = new SimpleGroup(		[new SimpleObject(oBerryBush, 5,5, 0,3)],		true, clBaseResource, bbX, bbZ	);	createObjectGroup(group, 0);		// create metal mine	var mAngle = bbAngle;	while(abs(mAngle - bbAngle) < PI/3)	{		mAngle = randFloat(0, TWO_PI);	}	var mDist = 12;	var mX = round(fx + mDist * cos(mAngle));	var mZ = round(fz + mDist * sin(mAngle));	group = new SimpleGroup(		[new SimpleObject(oMetalLarge, 1,1, 0,0)],		true, clBaseResource, mX, mZ	);	createObjectGroup(group, 0);		// create stone mines	mAngle += randFloat(PI/8, PI/4);	mX = round(fx + mDist * cos(mAngle));	mZ = round(fz + mDist * sin(mAngle));	group = new SimpleGroup(		[new SimpleObject(oStoneLarge, 1,1, 0,2)],		true, clBaseResource, mX, mZ	);	createObjectGroup(group, 0);	var hillSize = PI * radius * radius;	// create starting trees	var num = floor(hillSize / 100);	var tAngle = randFloat(0, TWO_PI);	var tDist = randFloat(11, 13);	var tX = round(fx + tDist * cos(tAngle));	var tZ = round(fz + tDist * sin(tAngle));	group = new SimpleGroup(		[new SimpleObject(oBeech, num, num, 0,5)],		false, clBaseResource, tX, tZ	);	createObjectGroup(group, 0, avoidClasses(clBaseResource,2));		// create grass tufts	var num = hillSize / 250;	for (var j = 0; j < num; j++)	{		var gAngle = randFloat(0, TWO_PI);		var gDist = radius - (5 + randInt(7));		var gX = round(fx + gDist * cos(gAngle));		var gZ = round(fz + gDist * sin(gAngle));		group = new SimpleGroup(			[new SimpleObject(aGrassShort, 2,5, 0,1, -PI/8,PI/8)],			false, clBaseResource, gX, gZ		);		createObjectGroup(group, 0);	}}RMS.SetProgress(20);// create bumpslog("Creating bumps...");placer = new ClumpPlacer(scaleByMapSize(20, 50), 0.3, 0.06, 1);painter = new SmoothElevationPainter(ELEVATION_MODIFY, 2, 2);createAreas(	placer,	painter, 	avoidClasses(clPlayer, 13),	scaleByMapSize(300, 800));// calculate desired number of trees for map (based on size)var MIN_TREES = 220;var MAX_TREES = 1000;var P_FOREST = 0.65;var totalTrees = scaleByMapSize(MIN_TREES, MAX_TREES);var numForest = totalTrees * P_FOREST;var numStragglers = totalTrees * (1.0 - P_FOREST);// create forestslog("Creating forests...");var types = [	[[tGrassDForest, tGrass, pForestD], [tGrassDForest, pForestD]],	[[tGrassPForest, tGrass, pForestP], [tGrassPForest, pForestP]]];	// some variationvar size = numForest / (scaleByMapSize(2,8) * numPlayers);var num = 4 * floor(size / types.length);for (var i = 0; i < types.length; ++i){	placer = new ClumpPlacer(numForest / num, 0.1, 0.1, 1);	painter = new LayeredPainter(		types[i],		// terrains		[2]											// widths		);	createAreas(		placer,		[painter, paintClass(clForest)], 		avoidClasses(clPlayer, 13, clForest, 20, clHill, 1),		num	);}RMS.SetProgress(50);// create grass patcheslog("Creating grass patches...");var sizes = [scaleByMapSize(5, 48), scaleByMapSize(6, 84), scaleByMapSize(8, 128)];for (var i = 0; i < sizes.length; i++){	placer = new ClumpPlacer(sizes[i], 0.3, 0.06, 0.5);	painter = new LayeredPainter(		[[tGrass,tGrassA,tGrassC],[tGrass,tGrassA,tGrassC], [tGrass,tGrassA,tGrassC]], 		// terrains		[1,1]															// widths	);	createAreas(		placer,		[painter, paintClass(clDirt)],		avoidClasses(clForest, 0, clHill, 0, clDirt, 2, clPlayer, 10),		scaleByMapSize(50, 70)	);}// create dirt patcheslog("Creating dirt patches...");var sizes = [scaleByMapSize(5, 32), scaleByMapSize(6, 48), scaleByMapSize(7, 80)];for (var i = 0; i < sizes.length; i++){	placer = new ClumpPlacer(sizes[i], 0.3, 0.06, 0.5);	painter = new LayeredPainter(		[tGrassB ,tDirt], 		// terrains		[1]															// widths	);	createAreas(		placer,		painter,		avoidClasses(clForest, 0, clHill, 0, clDirt, 2, clPlayer, 10),		scaleByMapSize(50, 90)	);}RMS.SetProgress(55);// create big patcheslog("Creating big patches...");var sizes = [scaleByMapSize(10, 60), scaleByMapSize(15, 90), scaleByMapSize(20, 120)];for (var i = 0; i < sizes.length; i++){	placer = new ClumpPlacer(sizes[i], 0.3, 0.06, 0.5);	painter = new LayeredPainter(		[tGrassB ,tGrassA], 		// terrains		[1]															// widths	);	createAreas(		placer,		painter,		avoidClasses(clHill, 0, clPlayer, 8),		scaleByMapSize(30, 90)	);}RMS.SetProgress(55);log("Creating stone mines...");// create large stone quarriesgroup = new SimpleGroup([new SimpleObject(oStoneSmall, 0,2, 0,4), new SimpleObject(oStoneLarge, 1,1, 0,4)], true, clRock);createObjectGroups(group, 0,	avoidClasses(clForest, 1, clPlayer, 10, clRock, 10, clHill, 1),	scaleByMapSize(1,4), 100);// create small stone quarriesgroup = new SimpleGroup([new SimpleObject(oStoneSmall, 2,5, 1,3)], true, clRock);createObjectGroups(group, 0,	avoidClasses(clForest, 1, clPlayer, 10, clRock, 10, clHill, 1),	scaleByMapSize(1,4), 100);log("Creating metal mines...");// create large metal quarriesgroup = new SimpleGroup([new SimpleObject(oMetalLarge, 1,1, 0,4)], true, clMetal);createObjectGroups(group, 0,	avoidClasses(clForest, 1, clPlayer, 10, clMetal, 10, clRock, 5, clHill, 1),	scaleByMapSize(2,8), 100);RMS.SetProgress(65);// create small decorative rockslog("Creating small decorative rocks...");group = new SimpleGroup(	[new SimpleObject(aRockMedium, 1,3, 0,1)],	true);createObjectGroups(	group, 0,	avoidClasses(clWater, 0, clForest, 0, clPlayer, 10, clHill, 0),	scaleByMapSize(16, 262), 50);// create large decorative rockslog("Creating large decorative rocks...");group = new SimpleGroup(	[new SimpleObject(aRockLarge, 1,2, 0,1), new SimpleObject(aRockMedium, 1,3, 0,2)],	true);createObjectGroups(	group, 0,	avoidClasses(clWater, 0, clForest, 0, clPlayer, 10, clHill, 0),	scaleByMapSize(8, 131), 50);RMS.SetProgress(70);// create deerlog("Creating deer...");group = new SimpleGroup(	[new SimpleObject(oDeer, 5,7, 0,4)],	true, clFood);createObjectGroups(group, 0,	avoidClasses(clWater, 0, clForest, 0, clPlayer, 10, clHill, 1, clFood, 20),	6 * numPlayers, 50);RMS.SetProgress(75);// create sheeplog("Creating sheep...");group = new SimpleGroup(	[new SimpleObject(oSheep, 2,3, 0,2)],	true, clFood);createObjectGroups(group, 0,	avoidClasses(clWater, 0, clForest, 0, clPlayer, 10, clHill, 1, clFood, 20),	3 * numPlayers, 50);RMS.SetProgress(85);// create straggler treeslog("Creating straggler trees...");var types = [oBush, oBeech];	// some variationvar num = floor(numStragglers / types.length);for (var i = 0; i < types.length; ++i){	group = new SimpleGroup(		[new SimpleObject(types[i], 1,1, 0,3)],		true, clForest	);	createObjectGroups(group, 0,		avoidClasses(clForest, 1, clHill, 1, clPlayer, 13, clMetal, 1, clRock, 1),		num	);}// create large grass tuftslog("Creating large grass tufts...");group = new SimpleGroup(	[new SimpleObject(aGrass, 2,4, 0,1.8, -PI/8,PI/8), new SimpleObject(aGrassShort, 3,6, 1.2,2.5, -PI/8,PI/8)]);createObjectGroups(group, 0,	avoidClasses(clWater, 3, clHill, 2, clPlayer, 2, clDirt, 1, clForest, 0),	scaleByMapSize(13, 200));RMS.SetProgress(95);// create busheslog("Creating bushes...");group = new SimpleGroup(	[new SimpleObject(aBushMedium, 1,2, 0,2), new SimpleObject(aBushSmall, 2,4, 0,2)]);createObjectGroups(group, 0,	avoidClasses(clWater, 1, clHill, 1, clPlayer, 1, clDirt, 1),	scaleByMapSize(13, 200), 50);ExportMap();