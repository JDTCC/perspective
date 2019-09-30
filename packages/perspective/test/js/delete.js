/******************************************************************************
 *
 * Copyright (c) 2017, the Perspective Authors.
 *
 * This file is part of the Perspective library, distributed under the terms of
 * the Apache License 2.0.  The full license can be found in the LICENSE file.
 *
 */

module.exports = perspective => {
    describe.only("Delete", function() {
        it("calls all delete callbacks registered on table", async function() {
            const table = perspective.table([{x: 1}]);

            const cb1 = jest.fn();
            const cb2 = jest.fn();

            table.on_delete(cb1);
            table.on_delete(cb2);

            await table.delete();

            expect(cb1).toHaveBeenCalledTimes(1);
            expect(cb2).toHaveBeenCalledTimes(1);
        });

        it("remove_delete unregisters table delete callbacks", async function() {
            const table = perspective.table([{x: 1}]);

            const cb1 = jest.fn();
            const cb2 = jest.fn();

            table.on_delete(cb1);
            table.on_delete(cb2);

            table.remove_delete(cb1);
            await table.delete();

            expect(cb1).toHaveBeenCalledTimes(0);
            expect(cb2).toHaveBeenCalledTimes(1);
        });

        it("calls all delete callbacks registered on view", async function() {
            const table = perspective.table([{x: 1}]);
            const view = table.view();

            const cb1 = jest.fn();
            const cb2 = jest.fn();

            view.on_delete(cb1);
            view.on_delete(cb2);

            await view.delete();

            expect(cb1).toHaveBeenCalledTimes(1);
            expect(cb2).toHaveBeenCalledTimes(1);

            await table.delete();
        });

        it("remove_delete unregisters view delete callbacks", async function() {
            const table = perspective.table([{x: 1}]);
            const view = table.view();

            const cb1 = jest.fn();
            const cb2 = jest.fn();

            view.on_delete(cb1);
            view.on_delete(cb2);

            view.remove_delete(cb1);
            await view.delete();

            expect(cb1).toHaveBeenCalledTimes(0);
            expect(cb2).toHaveBeenCalledTimes(1);

            await table.delete();
        });
    });
};
