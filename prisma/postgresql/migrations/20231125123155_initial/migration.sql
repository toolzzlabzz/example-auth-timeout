-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- CreateTable
CREATE TABLE "aiChat" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "fileUuid" VARCHAR(45),
    "userId" UUID NOT NULL,
    "unityId" UUID NOT NULL,
    "botId" UUID,
    "promptId" UUID,
    "createdAt" TIMESTAMP(0),

    CONSTRAINT "aiChat_pkey" PRIMARY KEY ("id","unityId")
);

-- CreateTable
CREATE TABLE "aiprompts" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "institutionsId" UUID NOT NULL,
    "botCreatedId" UUID NOT NULL,
    "profileId" UUID,
    "aiPrompt" TEXT,

    CONSTRAINT "aiprompts_pkey" PRIMARY KEY ("id","institutionsId")
);

-- CreateTable
CREATE TABLE "bot" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "creatorId" UUID NOT NULL,
    "institutionId" UUID NOT NULL,
    "unityId" UUID NOT NULL,
    "botName" VARCHAR(45),
    "botDescription" TEXT,
    "botIconImg" VARCHAR(45),
    "botMainFunction" TEXT,
    "botSecundarySkills" TEXT,
    "botCreativePrecision" INTEGER NOT NULL DEFAULT 2,
    "standartdatasetId" UUID NOT NULL,
    "knowLedgeBaseId" UUID NOT NULL,
    "botAdvConfigId" UUID NOT NULL,
    "botHumourUuid" UUID,

    CONSTRAINT "bot_pkey" PRIMARY KEY ("id","creatorId","institutionId","unityId","standartdatasetId")
);

-- CreateTable
CREATE TABLE "standartdataset" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "BaseBotModelId" UUID NOT NULL,
    "openAiKey" VARCHAR(45),
    "chatFlowKey" VARCHAR(45)
);

-- CreateTable
CREATE TABLE "botmodel" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "botModel" VARCHAR(45)
);

-- CreateTable
CREATE TABLE "botAdvConfig" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "buttonsId" UUID NOT NULL,
    "buttonPosition" BYTEA
);

-- CreateTable
CREATE TABLE "botadvconfig" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "buttonLabel" BYTEA
);

-- CreateTable
CREATE TABLE "chatfilecontent" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "chatFileId" UUID NOT NULL,
    "aiChatsId" UUID NOT NULL,

    CONSTRAINT "chatfilecontent_pkey" PRIMARY KEY ("id","chatFileId","aiChatsId")
);

-- CreateTable
CREATE TABLE "chatfolder" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "unityId" UUID NOT NULL,
    "profileId" UUID NOT NULL,
    "chatFolderName" VARCHAR(45),
    "chatFolderDescription" VARCHAR(45),

    CONSTRAINT "chatfolder_pkey" PRIMARY KEY ("id","unityId")
);

-- CreateTable
CREATE TABLE "institution" (
    "id" UUID NOT NULL,
    "institutionUuid" UUID NOT NULL,
    "aiDefaultModel" VARCHAR(45),
    "chatStyle" VARCHAR(45),
    "primaryColorHex" VARCHAR(45),
    "secondaryColorHex" VARCHAR(45),
    "lightModeLogoUrl" VARCHAR(255),
    "lightModeAltLogoUrl" VARCHAR(255),
    "darkModeLogoUrl" VARCHAR(255),
    "darkModeAltLogoUrl" VARCHAR(255),
    "faviconUrl" VARCHAR(255),
    "theme" VARCHAR(45),
    "subdomain" VARCHAR(45),
    "customDomain" VARCHAR(45),
    "apiConversationUrl" VARCHAR(255),

    CONSTRAINT "institution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kbcontentlibrary" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "folderId" UUID,
    "kbContentText" TEXT,
    "kbContentUrl" VARCHAR(255),
    "kbContentHash" VARCHAR(45),
    "kbContentStatus" VARCHAR(45),
    "kbContentTracking" INTEGER
);

-- CreateTable
CREATE TABLE "kbcontentsourcessettings" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "botCreatedId" UUID NOT NULL,
    "contentSourceId" UUID NOT NULL,
    "keyPosition" INTEGER,

    CONSTRAINT "kbcontentsourcessettings_pkey" PRIMARY KEY ("id","contentSourceId")
);

-- CreateTable
CREATE TABLE "kbfoldercontentrelation" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "botId" UUID,
    "kbFolderId" UUID NOT NULL,
    "kbContentId" UUID NOT NULL,

    CONSTRAINT "kbfoldercontentrelation_pkey" PRIMARY KEY ("id","kbContentId")
);

-- CreateTable
CREATE TABLE "knowledgebase" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "unityId" UUID NOT NULL,
    "kbCreatorId" UUID,
    "kbInstitutionId" UUID,
    "kbStatus" SMALLINT,
    "kbName" VARCHAR(45),
    "kbDescription" TEXT,
    "kbIconImg" VARCHAR(45),
    "kbContentSourceId" UUID,
    "kbFilesStorageId" UUID
);

-- CreateTable
CREATE TABLE "kbFolder" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "institutionId" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "kbFolder_pkey" PRIMARY KEY ("id","institutionId")
);

-- CreateTable
CREATE TABLE "knowledgebasefile" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "folderCreatorId" UUID,
    "kbInstitutionId" UUID,
    "kbFileName" VARCHAR(45),
    "kbFolderDescription" TEXT,
    "knowLedgeBaseId" UUID NOT NULL,

    CONSTRAINT "knowledgebasefile_pkey" PRIMARY KEY ("id","knowLedgeBaseId")
);

-- CreateTable
CREATE TABLE "llmkey" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "institutionId" UUID NOT NULL,
    "llmProviderId" UUID,
    "llmIsActive" SMALLINT,
    "llmKey" VARCHAR(45),

    CONSTRAINT "llmkey_pkey" PRIMARY KEY ("id","institutionId")
);

-- CreateTable
CREATE TABLE "llmunity" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "llmKeysId" UUID NOT NULL,
    "unityId" UUID,

    CONSTRAINT "llmunity_pkey" PRIMARY KEY ("id","llmKeysId")
);

-- CreateTable
CREATE TABLE "profile" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID,
    "institutionId" UUID NOT NULL,
    "user_institution_id" UUID NOT NULL,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teammember" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "institutionId" UUID NOT NULL,
    "profileId" UUID NOT NULL,
    "invitedById" UUID NOT NULL,
    "memberRole" INTEGER,

    CONSTRAINT "teammember_pkey" PRIMARY KEY ("id","invitedById")
);

-- CreateTable
CREATE TABLE "teammembersunity" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "profileId" UUID NOT NULL,
    "unityId" UUID NOT NULL,

    CONSTRAINT "teammembersunity_pkey" PRIMARY KEY ("id","unityId")
);

-- CreateTable
CREATE TABLE "unity" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "institutionId" UUID NOT NULL,
    "unityUuid" VARCHAR(45),
    "aiDefaultModel" VARCHAR(45),
    "chatStyle" VARCHAR(45),
    "primaryColorHex" VARCHAR(45),
    "secondaryColorHex" VARCHAR(45),
    "lightModeLogoUrl" VARCHAR(255),
    "lightModeAltLogoUrl" VARCHAR(255),
    "darkModeLogoUrl" VARCHAR(255),
    "darkModeAltLogoUrl" VARCHAR(255),
    "faviconUrl" VARCHAR(255),
    "theme" VARCHAR(45),
    "subdomain" VARCHAR(45),

    CONSTRAINT "unity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userUuid" UUID,
    "name" VARCHAR(45) NOT NULL,
    "email" VARCHAR(45) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "rememberMeToken" VARCHAR(255),
    "institutionUnity" TEXT,
    "institutionId" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "aiChat_id_key" ON "aiChat"("id");

-- CreateIndex
CREATE INDEX "fk_ai_chats_unity1_idx" ON "aiChat"("unityId");

-- CreateIndex
CREATE INDEX "fk_ai_chats_users1_idx" ON "aiChat"("userId");

-- CreateIndex
CREATE INDEX "fk_ai_prompts_bot_created1_idx" ON "aiprompts"("botCreatedId");

-- CreateIndex
CREATE INDEX "fk_ai_prompts_institutions1_idx" ON "aiprompts"("institutionsId");

-- CreateIndex
CREATE UNIQUE INDEX "bot_id_key" ON "bot"("id");

-- CreateIndex
CREATE INDEX "fk_bot_created_bot_advconfig1_idx" ON "bot"("botAdvConfigId");

-- CreateIndex
CREATE INDEX "fk_bot_created_standartdataset1_idx" ON "bot"("standartdatasetId");

-- CreateIndex
CREATE INDEX "fk_bot_created_institutions1_idx" ON "bot"("institutionId");

-- CreateIndex
CREATE INDEX "fk_bot_created_knowledge_base1_idx" ON "bot"("knowLedgeBaseId");

-- CreateIndex
CREATE INDEX "fk_bot_created_unity1_idx" ON "bot"("unityId");

-- CreateIndex
CREATE INDEX "fk_bot_created_users_admins1_idx" ON "bot"("creatorId");

-- CreateIndex
CREATE UNIQUE INDEX "standartdataset_id_key" ON "standartdataset"("id");

-- CreateIndex
CREATE INDEX "fk_bot_standartset_base_bot_idx" ON "standartdataset"("BaseBotModelId");

-- CreateIndex
CREATE UNIQUE INDEX "botmodel_id_key" ON "botmodel"("id");

-- CreateIndex
CREATE UNIQUE INDEX "botAdvConfig_id_key" ON "botAdvConfig"("id");

-- CreateIndex
CREATE INDEX "fk_bot_advconfig_bot_advconfig_buttons1_idx" ON "botAdvConfig"("buttonsId");

-- CreateIndex
CREATE UNIQUE INDEX "botadvconfig_id_key" ON "botadvconfig"("id");

-- CreateIndex
CREATE UNIQUE INDEX "chatfilecontent_id_key" ON "chatfilecontent"("id");

-- CreateIndex
CREATE INDEX "fk_chat_folder_content_ai_chats1_idx" ON "chatfilecontent"("aiChatsId");

-- CreateIndex
CREATE INDEX "fk_chat_folder_content_chat_folders1_idx" ON "chatfilecontent"("chatFileId");

-- CreateIndex
CREATE UNIQUE INDEX "chatfolder_id_key" ON "chatfolder"("id");

-- CreateIndex
CREATE INDEX "fk_chatFolder_profile1_idx" ON "chatfolder"("profileId");

-- CreateIndex
CREATE INDEX "fk_chat_folders_unity1_idx" ON "chatfolder"("unityId");

-- CreateIndex
CREATE UNIQUE INDEX "institution_subdomain_key" ON "institution"("subdomain");

-- CreateIndex
CREATE UNIQUE INDEX "kbcontentlibrary_id_key" ON "kbcontentlibrary"("id");

-- CreateIndex
CREATE UNIQUE INDEX "kbcontentsourcessettings_id_key" ON "kbcontentsourcessettings"("id");

-- CreateIndex
CREATE INDEX "fk_kb_content_sources_settings_bot_created1_idx" ON "kbcontentsourcessettings"("botCreatedId");

-- CreateIndex
CREATE UNIQUE INDEX "kbfoldercontentrelation_id_key" ON "kbfoldercontentrelation"("id");

-- CreateIndex
CREATE INDEX "fk_kb_folder_content_relation_kb_content_library1_idx" ON "kbfoldercontentrelation"("kbContentId");

-- CreateIndex
CREATE INDEX "fk_kb_folder_content_relation_knowledge_base_folder1_idx" ON "kbfoldercontentrelation"("kbFolderId");

-- CreateIndex
CREATE UNIQUE INDEX "knowledgebase_id_key" ON "knowledgebase"("id");

-- CreateIndex
CREATE INDEX "fk_knowledge_base_unity1_idx" ON "knowledgebase"("unityId");

-- CreateIndex
CREATE UNIQUE INDEX "kbFolder_id_key" ON "kbFolder"("id");

-- CreateIndex
CREATE INDEX "fk_kbfolder_institutions1_idx" ON "kbFolder"("institutionId");

-- CreateIndex
CREATE UNIQUE INDEX "knowledgebasefile_id_key" ON "knowledgebasefile"("id");

-- CreateIndex
CREATE INDEX "fk_knowledge_base_folder_knowledge_base1_idx" ON "knowledgebasefile"("knowLedgeBaseId");

-- CreateIndex
CREATE UNIQUE INDEX "llmkey_id_key" ON "llmkey"("id");

-- CreateIndex
CREATE INDEX "fk_llm_keys_institutions1_idx" ON "llmkey"("institutionId");

-- CreateIndex
CREATE UNIQUE INDEX "llmunity_id_key" ON "llmunity"("id");

-- CreateIndex
CREATE INDEX "fk_llm_unity_llm_keys1_idx" ON "llmunity"("llmKeysId");

-- CreateIndex
CREATE UNIQUE INDEX "profile_id_key" ON "profile"("id");

-- CreateIndex
CREATE INDEX "fk_profile_institution1_idx" ON "profile"("institutionId");

-- CreateIndex
CREATE INDEX "fk_profile_user1_idx" ON "profile"("userId", "user_institution_id");

-- CreateIndex
CREATE UNIQUE INDEX "teammember_id_key" ON "teammember"("id");

-- CreateIndex
CREATE INDEX "fk_teamMember_profile1_idx" ON "teammember"("profileId");

-- CreateIndex
CREATE INDEX "fk_team_members_institutions1_idx" ON "teammember"("institutionId");

-- CreateIndex
CREATE INDEX "fk_team_members_users_admins1_idx" ON "teammember"("invitedById");

-- CreateIndex
CREATE UNIQUE INDEX "teammembersunity_id_key" ON "teammembersunity"("id");

-- CreateIndex
CREATE INDEX "fk_teamMembersUnity_profile1_idx" ON "teammembersunity"("profileId");

-- CreateIndex
CREATE INDEX "fk_team_members_has_unity_unity1_idx" ON "teammembersunity"("unityId");

-- CreateIndex
CREATE UNIQUE INDEX "unity_id_key" ON "unity"("id");

-- CreateIndex
CREATE INDEX "fk_unity_institutions1_idx" ON "unity"("institutionId");

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "aiChat" ADD CONSTRAINT "fk_ai_chats_unity1" FOREIGN KEY ("unityId") REFERENCES "unity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "aiChat" ADD CONSTRAINT "fk_ai_chats_users1" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "aiprompts" ADD CONSTRAINT "fk_ai_prompts_bot_created1" FOREIGN KEY ("botCreatedId") REFERENCES "bot"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "aiprompts" ADD CONSTRAINT "fk_ai_prompts_institutions1" FOREIGN KEY ("institutionsId") REFERENCES "institution"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "bot" ADD CONSTRAINT "fk_bot_created_bot_advconfig1" FOREIGN KEY ("botAdvConfigId") REFERENCES "botAdvConfig"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "bot" ADD CONSTRAINT "fk_bot_created_standartdataset1" FOREIGN KEY ("standartdatasetId") REFERENCES "standartdataset"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "bot" ADD CONSTRAINT "fk_bot_created_institutions1" FOREIGN KEY ("institutionId") REFERENCES "institution"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "bot" ADD CONSTRAINT "fk_bot_created_knowledge_base1" FOREIGN KEY ("knowLedgeBaseId") REFERENCES "knowledgebase"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "bot" ADD CONSTRAINT "fk_bot_created_unity1" FOREIGN KEY ("unityId") REFERENCES "unity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "bot" ADD CONSTRAINT "fk_bot_created_users_admins1" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "standartdataset" ADD CONSTRAINT "fk_standartdatabase_baseModel1" FOREIGN KEY ("BaseBotModelId") REFERENCES "botmodel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "botAdvConfig" ADD CONSTRAINT "fk_bot_advconfig_bot_advconfig_buttons1" FOREIGN KEY ("buttonsId") REFERENCES "botadvconfig"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "chatfilecontent" ADD CONSTRAINT "fk_chat_folder_content_ai_chats1" FOREIGN KEY ("aiChatsId") REFERENCES "aiChat"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "chatfilecontent" ADD CONSTRAINT "fk_chat_folder_content_chat_folders1" FOREIGN KEY ("chatFileId") REFERENCES "chatfolder"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "chatfolder" ADD CONSTRAINT "fk_chatFolder_profile1" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "chatfolder" ADD CONSTRAINT "fk_chat_folders_unity1" FOREIGN KEY ("unityId") REFERENCES "unity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "kbcontentsourcessettings" ADD CONSTRAINT "fk_kb_content_sources_settings_bot_created1" FOREIGN KEY ("botCreatedId") REFERENCES "bot"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "kbfoldercontentrelation" ADD CONSTRAINT "fk_kb_folder_content_relation_kb_content_library1" FOREIGN KEY ("kbContentId") REFERENCES "kbcontentlibrary"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "kbfoldercontentrelation" ADD CONSTRAINT "fk_kb_folder_content_relation_knowledge_base_folder1" FOREIGN KEY ("kbFolderId") REFERENCES "knowledgebasefile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "knowledgebase" ADD CONSTRAINT "fk_knowledge_base_unity1" FOREIGN KEY ("unityId") REFERENCES "unity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "kbFolder" ADD CONSTRAINT "kbFolder_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "institution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "knowledgebasefile" ADD CONSTRAINT "fk_knowledge_base_folder_knowledge_base1" FOREIGN KEY ("knowLedgeBaseId") REFERENCES "knowledgebase"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "llmkey" ADD CONSTRAINT "fk_llm_keys_institutions1" FOREIGN KEY ("institutionId") REFERENCES "institution"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "llmunity" ADD CONSTRAINT "fk_llm_unity_llm_keys1" FOREIGN KEY ("llmKeysId") REFERENCES "llmkey"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "fk_profile_institution1" FOREIGN KEY ("institutionId") REFERENCES "institution"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "fk_profile_user1" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "teammember" ADD CONSTRAINT "fk_teamMember_profile1" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "teammember" ADD CONSTRAINT "fk_team_members_institutions1" FOREIGN KEY ("institutionId") REFERENCES "institution"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "teammember" ADD CONSTRAINT "fk_team_members_users_admins1" FOREIGN KEY ("invitedById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "teammembersunity" ADD CONSTRAINT "fk_teamMembersUnity_profile1" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "teammembersunity" ADD CONSTRAINT "fk_team_members_has_unity_unity1" FOREIGN KEY ("unityId") REFERENCES "unity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "unity" ADD CONSTRAINT "fk_unity_institutions1" FOREIGN KEY ("institutionId") REFERENCES "institution"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "institution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
