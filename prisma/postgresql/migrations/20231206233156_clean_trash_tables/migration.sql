/*
  Warnings:

  - You are about to drop the `aiChat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `aiprompts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `botAdvConfig` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `botKnowledgebaseFile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `botadvconfig` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `botmodel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `chatfilecontent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `chatfolder` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `kbcontentlibrary` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `kbcontentsourcessettings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `kbfoldercontentrelation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `llmkey` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `llmunity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `standartdataset` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `teammember` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `teammembersunity` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "aiChat" DROP CONSTRAINT "fk_ai_chats_unity1";

-- DropForeignKey
ALTER TABLE "aiChat" DROP CONSTRAINT "fk_ai_chats_users1";

-- DropForeignKey
ALTER TABLE "aiprompts" DROP CONSTRAINT "fk_ai_prompts_institutions1";

-- DropForeignKey
ALTER TABLE "botAdvConfig" DROP CONSTRAINT "fk_bot_advconfig_bot_advconfig_buttons1";

-- DropForeignKey
ALTER TABLE "botKnowledgebaseFile" DROP CONSTRAINT "botKnowledgebaseFile_botId_fkey";

-- DropForeignKey
ALTER TABLE "botKnowledgebaseFile" DROP CONSTRAINT "botKnowledgebaseFile_knowLedgeBaseId_fkey";

-- DropForeignKey
ALTER TABLE "botKnowledgebaseFile" DROP CONSTRAINT "botKnowledgebaseFile_knowledgebaseFileId_fkey";

-- DropForeignKey
ALTER TABLE "chatfilecontent" DROP CONSTRAINT "fk_chat_folder_content_ai_chats1";

-- DropForeignKey
ALTER TABLE "chatfilecontent" DROP CONSTRAINT "fk_chat_folder_content_chat_folders1";

-- DropForeignKey
ALTER TABLE "chatfolder" DROP CONSTRAINT "fk_chatFolder_profile1";

-- DropForeignKey
ALTER TABLE "chatfolder" DROP CONSTRAINT "fk_chat_folders_unity1";

-- DropForeignKey
ALTER TABLE "kbfoldercontentrelation" DROP CONSTRAINT "fk_kb_folder_content_relation_kb_content_library1";

-- DropForeignKey
ALTER TABLE "kbfoldercontentrelation" DROP CONSTRAINT "fk_kb_folder_content_relation_knowledge_base_folder1";

-- DropForeignKey
ALTER TABLE "llmkey" DROP CONSTRAINT "fk_llm_keys_institutions1";

-- DropForeignKey
ALTER TABLE "llmunity" DROP CONSTRAINT "fk_llm_unity_llm_keys1";

-- DropForeignKey
ALTER TABLE "profile" DROP CONSTRAINT "fk_profile_institution1";

-- DropForeignKey
ALTER TABLE "profile" DROP CONSTRAINT "fk_profile_user1";

-- DropForeignKey
ALTER TABLE "standartdataset" DROP CONSTRAINT "standartdataset_botModelId_fkey";

-- DropForeignKey
ALTER TABLE "standartdataset" DROP CONSTRAINT "standartdataset_genAIModelId_fkey";

-- DropForeignKey
ALTER TABLE "teammember" DROP CONSTRAINT "fk_teamMember_profile1";

-- DropForeignKey
ALTER TABLE "teammember" DROP CONSTRAINT "fk_team_members_institutions1";

-- DropForeignKey
ALTER TABLE "teammember" DROP CONSTRAINT "fk_team_members_users_admins1";

-- DropForeignKey
ALTER TABLE "teammembersunity" DROP CONSTRAINT "fk_teamMembersUnity_profile1";

-- DropForeignKey
ALTER TABLE "teammembersunity" DROP CONSTRAINT "fk_team_members_has_unity_unity1";

-- DropTable
DROP TABLE "aiChat";

-- DropTable
DROP TABLE "aiprompts";

-- DropTable
DROP TABLE "botAdvConfig";

-- DropTable
DROP TABLE "botKnowledgebaseFile";

-- DropTable
DROP TABLE "botadvconfig";

-- DropTable
DROP TABLE "botmodel";

-- DropTable
DROP TABLE "chatfilecontent";

-- DropTable
DROP TABLE "chatfolder";

-- DropTable
DROP TABLE "kbcontentlibrary";

-- DropTable
DROP TABLE "kbcontentsourcessettings";

-- DropTable
DROP TABLE "kbfoldercontentrelation";

-- DropTable
DROP TABLE "llmkey";

-- DropTable
DROP TABLE "llmunity";

-- DropTable
DROP TABLE "profile";

-- DropTable
DROP TABLE "standartdataset";

-- DropTable
DROP TABLE "teammember";

-- DropTable
DROP TABLE "teammembersunity";
