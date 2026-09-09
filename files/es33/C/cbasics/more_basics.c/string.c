#include<stdio.h>
#include<string.h>
int main(){

	char ch[16]="jagadeesh";

	printf("length of the string was = %lu\n",strlen(ch));

	printf("size of the string was = %lu\n",sizeof(ch));

	for(int i=0;i< strlen(ch); i++)
	{
		printf("size of every %d element %c\n",i,ch[i]);

	}
	return 0;
	
}
