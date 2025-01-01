def fromMongoToSparkdf(spark, mongoList):
    rdd = spark.sparkContext.parallelize(mongoList)
    df = spark.read.json(rdd)
    return df
