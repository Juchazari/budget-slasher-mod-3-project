class ListsController < ApplicationController
    def index
        lists = List.all
        render json: lists, include: :expenditures
    end

    def update
        list = List.find(params[:id])
        list.update(list_params)
    end

    def create
        user = User.find(params[:user_id])
        list = List.create(category: params[:category], budget: params[:budget], user_id: user.id)
        render json: list, include: :expenditures
    end

    def destroy
        List.find(params[:id]).destroy
    end

    private

        def list_params
            params.require(:list).permit(:category, :budget)
        end
end
