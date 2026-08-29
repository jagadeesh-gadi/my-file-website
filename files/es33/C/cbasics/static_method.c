#include<stdio.h>
void count(){
	static int count1 =0;

	count1 ++;
	printf("%d",count1);
}

int globalVar =100;

void printGlobalVar();
int main(){
        printGlobalVar();
	count();

	count();
	count();
	count();
   return 0;
}
void printGlobalVar() {
    printf("%d\n", globalVar);
}
