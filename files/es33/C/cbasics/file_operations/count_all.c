#include <stdio.h>
void count_char(FILE *fp)
{
    int char_count = 0, a;
    while (a = fgetc(fp) != EOF)
    {
        char_count++;
    }
    printf("char count :: %d\n", char_count);
}

void word_count(FILE *fp)
{
    int word = 0;
    char str[1000];
    while (fscanf(fp, "%999s", str) == 1)
    {
        word++;
    }
    printf("word count :: %d\n", word);
}

void line_count(FILE *fp)
{
    char str[1000];
    int line = 0;
    while (fgets(str, sizeof(str), fp) != NULL)
    {
        line++;
    }
    printf("line count :: %d\n", line);
}
int main()
{
    FILE *fp;
    fp = fopen("text.txt", "r");
    if (fp == NULL)
    {
        printf("failed to open file");
        return 1;
    }
    count_char(fp);
    rewind(fp);
    word_count(fp);
    rewind(fp);
    line_count(fp);

    fclose(fp);
    return 0;
}