-- CreateTable
CREATE TABLE "User" (
    "_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "email" TEXT,
    "emailVerified" BOOLEAN NOT NULL,
    "hashedPassword" TEXT,
    "githubId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "favoriteIds" TEXT[],
    "isPremium" BOOLEAN NOT NULL,
    "premiumDuration" INTEGER,
    "provider" TEXT DEFAULT 'none',
    "admin" BOOLEAN NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Account" (
    "_id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Session" (
    "_id" TEXT NOT NULL,
    "SessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "_id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Movie" (
    "_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "thumbnailUrl" TEXT,
    "videoUrl" TEXT NOT NULL,
    "language" TEXT,
    "author" TEXT,
    "duration" TEXT,
    "verificationLevel" INTEGER,
    "year" INTEGER,
    "rating" DOUBLE PRECISION,
    "favoriteLength" INTEGER NOT NULL,
    "views" INTEGER NOT NULL,
    "outfileArticle" TEXT,
    "isTrending" BOOLEAN NOT NULL,
    "isPremium" BOOLEAN NOT NULL,
    "premiumDuration" INTEGER NOT NULL DEFAULT 90,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "LinkedArticle" (
    "_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "movieId" TEXT NOT NULL,
    "imageOne" TEXT NOT NULL,
    "imageTwo" TEXT NOT NULL,

    CONSTRAINT "LinkedArticle_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "_id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "likes" INTEGER NOT NULL,
    "dislikes" INTEGER NOT NULL,
    "ambiguous" INTEGER NOT NULL,
    "best" BOOLEAN NOT NULL,
    "userId" TEXT NOT NULL,
    "movieId" TEXT NOT NULL,
    "linkedArticleId" TEXT,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Genre" (
    "_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "qty" INTEGER NOT NULL,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "UserMovie" (
    "userId" TEXT NOT NULL,
    "movieId" TEXT NOT NULL,

    CONSTRAINT "UserMovie_pkey" PRIMARY KEY ("userId","movieId")
);

-- CreateTable
CREATE TABLE "MovieArticle" (
    "movieId" TEXT NOT NULL,
    "articleId" TEXT NOT NULL,

    CONSTRAINT "MovieArticle_pkey" PRIMARY KEY ("movieId","articleId")
);

-- CreateTable
CREATE TABLE "MovieGenre" (
    "movieId" TEXT NOT NULL,
    "genreId" TEXT NOT NULL,

    CONSTRAINT "MovieGenre_pkey" PRIMARY KEY ("movieId","genreId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_SessionToken_key" ON "Session"("SessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LinkedArticle" ADD CONSTRAINT "LinkedArticle_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LinkedArticle" ADD CONSTRAINT "LinkedArticle_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_linkedArticleId_fkey" FOREIGN KEY ("linkedArticleId") REFERENCES "LinkedArticle"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMovie" ADD CONSTRAINT "UserMovie_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMovie" ADD CONSTRAINT "UserMovie_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieArticle" ADD CONSTRAINT "MovieArticle_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieArticle" ADD CONSTRAINT "MovieArticle_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "LinkedArticle"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieGenre" ADD CONSTRAINT "MovieGenre_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieGenre" ADD CONSTRAINT "MovieGenre_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre"("_id") ON DELETE CASCADE ON UPDATE CASCADE;
