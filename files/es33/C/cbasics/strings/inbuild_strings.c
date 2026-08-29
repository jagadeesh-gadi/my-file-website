#include <stdio.h>
#include <string.h>

int main()
{

    char str1[] = "jagadeesh";
    char str2[30];
    // str length
    strlen(str1);
    printf("string length :: %lu\n", strlen(str1));

    //  string copy
    strcpy(str2, str1);
    printf("string copy :: %s\n", str2);

    // string n char copy
    char ncpy[100];
    strncpy(ncpy, str1, 3);
    printf("string n char copy :: %s\n", ncpy);

    // string compare
    char str4[] = "hello";
    if (strcmp(str1, str4) == 0)
        printf("equal\n");
    else
        printf("not eqaul\n");

    // string n compare
    char str5[] = "help";
    printf("str n compare :: %d\n", strncmp(str4, str5, 3));

    // string concat
    printf("string concat :: %s\n", strcat(str4, str5));

    // string n concat
    printf("string concat n char:: %s\n", strncat(str4, str5, 7));

    // string character point to the 1st "ONE"
    char str6[] = "jagadeesh";
    printf("string character :: %s\n", strchr(str6, 'e'));

    // string last character point to the 1st "LASTONE"
    printf("string last character :: %s\n", strrchr(str6, 'e'));

    // string in string
    char str7[] = "hello jagadeesh";
    printf("string in another string :: %s\n", strstr(str7, "jagadeesh"));

    // string tocken

    char *token = strtok(str7, " ");
    printf("token the sting ::\n");
    while (token != NULL)
    {
        printf(" %s\n", token);
        token = strtok(NULL, " ");
    }
    return 0;
}